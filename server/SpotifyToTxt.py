from spotipy import SpotifyClientCredentials
from dotenv import load_dotenv
from termcolor import cprint
import pandas as pd
import unicodedata
import spotipy
import json
import os
import re

path = ""


# Loading the client id and client secret
def initialize_credentials():
  load_dotenv()
  global CLIENT_ID
  global CLIENT_SECRET

  CLIENT_ID = os.getenv("CLIENT_ID")
  CLIENT_SECRET = os.getenv("CLIENT_SECRET")


def set_credentials():
  id = input("Your CLIENT ID: ")
  secret = input("Your CLIENT SECRET: ")
  with open(".env", "w") as f:
    f.write(f"CLIENT_ID={id}\n")
    f.write(f"CLIENT_SECRET={secret}")


def clean(name: str) -> str:
  windows_invalid_pattern = r'[\\/:*?"<>|]'

  # Normalize Unicode characters and remove non printable characters
  cleaned_name = unicodedata.normalize("NFKD", name)
  cleaned_name = cleaned_name.encode("ascii", "ignore").decode("ascii")

  # Replace invalid characters after unicode normalizing
  cleaned_name = re.sub(windows_invalid_pattern, "", cleaned_name)

  # Remove trailing spaces and periods
  cleaned_name = cleaned_name.strip(" .")

  # Windows allows filenames upto 255 characters
  if len(cleaned_name) > 255:
    cleaned_name = cleaned_name[:255]

  return cleaned_name


def connect_spotify(id, secret):
  try:
    # connecting with spotify API
    auth_manager = SpotifyClientCredentials(client_id=id or CLIENT_ID, client_secret=secret or CLIENT_SECRET)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    test_playlist = sp.playlist("37i9dQZF1DXcBWIGoYBM5M")

    if not test_playlist:
      raise Exception("Could not connect to spotify")
    cprint(text="Connected to Spotify API succeessfully.", color="green")
    return sp

  except Exception as e:
    cprint(text="Could not connect to Spotify..", color="red")
    cprint(text="Check your internet or change your .env file ", color="red")


def getSongs(playlist_link: str):
  sp = connect_spotify()
  # playlist_link = "https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX"
  playlist_dict = sp.playlist(playlist_link)

  # slicing the playlist object for the needed stuff
  global playlist_name
  global playlist_cover
  playlist_name = playlist_dict["name"]
  playlist_cover = playlist_dict['images'][0]['url']
  no_of_songs = playlist_dict["tracks"]["total"]

  # creating a dataframe for storing all the data
  df = pd.DataFrame({
      "songs": pd.Series(dtype="str"),
      "artists": pd.Series(dtype="str"),
      "album": pd.Series(dtype="str"),
      "release date": pd.Series(dtype="str"),
      "image": pd.Series(dtype="str"),
  })

  tracks = playlist_dict["tracks"]
  items = tracks["items"]

  total = []

  offset = 0

  for i in range(no_of_songs):
    name = clean(items[i - offset]["track"]["name"])
    df.loc[i, "songs"] = name

    album = items[i - offset]["track"]["album"]["name"]
    df.loc[i, "album"] = album

    release_date = items[i - offset]["track"]["album"]["release_date"]
    df.loc[i, "release date"] = release_date

    images = [k["url"] for k in items[i - offset]["track"]["album"]["images"]]
    ", ".join(images)
    df.loc[i, "image"] = images

    artists = [clean(k["name"]) for k in items[i - offset]["track"]["artists"]]
    artists = ",".join(artists)
    df.loc[i, "artists"] = artists

    total.append({
        'index': i + 1,
        'name': name,
        'artists': artists,
        'album': album,
        'images': images[1],
        'duration': items[i - offset]['track']['duration_ms'],
    })

    if (i + 1) % 100 == 0:
      tracks = sp.next(tracks)
      items = tracks["items"]
      offset = i + 1

  global path
  path = os.path.join(os.getcwd(), "queue", f"{playlist_name}.txt")
  os.makedirs("queue", exist_ok=True)
  df.to_csv(path, sep="\t", index=False)
  return total


def search_gui(name: str, qtype='name') -> pd.DataFrame:
  try:
    if (qtype == 'name'):
      sp = connect_spotify()
      results = sp.search(q=name, type='track', limit=10)
      return results
    elif (qtype == 'playlist'):
      return getSongs(name)
  except Exception as e:
    print(e)
    return False
    # return json.dump({
    #     'message': 'Something went wrong while searching...',
    #     'success': False,
    # })


def search_spotify(names: list) -> list:
  sp = connect_spotify()
  tracks = pd.DataFrame({"songs": pd.Series(dtype='str'), "artists": pd.Series(dtype="str")})

  try:
    for name in names:
      result = sp.search(q=name, type='track', limit=10)
      print()
      queue = []
      for idx, track in enumerate(result['tracks']['items']):
        queue.append([track['name'], track['artists'][0]['name']])
        print(f"{idx+1}. {track['name']} by {track['artists'][0]['name']}")

      os.makedirs('queue', exist_ok=True)
      choice = int(input("\nChoose a song to download: "))

      if (choice > 0):
        tracks.loc[len(tracks)] = queue[choice - 1]
      else:
        raise Exception(404)

    global path
    path = os.path.join("queue", "queue.txt")
    tracks.to_csv(path, sep='\t')
  except Exception as e:
    if (str(e) == '404'):
      cprint(text="Invalid choice!!", color='red')
    else:
      print(e)
      cprint(text="Something went wrong while searching for the song...", color="red")
    exit()


try:
  if os.path.exists(".env"):
    initialize_credentials()
  else:
    cprint(text=".env File does not exist\n", color="red")
    raise Exception(404)
except Exception as e:
  cprint(
      text="You have not yet initialized the credentials file, You can do so now: \nYOU WILL NEED A SPOTIFY FOR DEVELOPERS ACCOUNT TO CONTINUE!!",
      color="yellow",
  )
  if str(e) == "404":
    set_credentials()
  initialize_credentials()

if __name__ == "__main__":
  getSongs("https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX")
