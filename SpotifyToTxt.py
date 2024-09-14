from spotipy import SpotifyClientCredentials
from termcolor import colored, cprint
from dotenv import load_dotenv
import pandas as pd
import unicodedata
import spotipy
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


try:
    if os.path.exists(".env"):
        initialize_credentials()
    else:
        cprint(text=".env File does not exist\n", color="red")
        raise Exception(404)
except Exception as e:
    cprint(
        text=
        "You have not yet initialized the credentials file, You can do so now: \nYOU WILL NEED A SPOTIFY FOR DEVELOPERS ACCOUNT TO CONTINUE!!",
        color="yellow",
    )
    if str(e) == "404":
        set_credentials()
    initialize_credentials()


def clean(name):
    windows_invalid_pattern = r'[\\/:*?">|]'
    cleaned_name = re.sub(windows_invalid_pattern, "", name)

    # Normalize Unicode characters and remove non printable characters
    cleaned_name = unicodedata.normalize("NFKD", cleaned_name)
    # cleaned_name = re.sub(r"[^\x00-\x7F]+", "", cleaned_name)
    cleaned_name = cleaned_name.encode("ascii", "ignore").decode("ascii")

    # Replace invalid characters after unicode normalizing
    cleaned_name = re.sub(windows_invalid_pattern, "", cleaned_name)

    # Remove trailing spaces and periods
    cleaned_name = cleaned_name.strip(" .")

    # Windows allows filenames upto 255 characters
    if len(cleaned_name) > 255:
        cleaned_name = cleaned_name[:255]

    return cleaned_name


def getSongs(playlist_link):
    try:
        # connecting with spotify API
        auth_manager = SpotifyClientCredentials(client_id=CLIENT_ID,
                                                client_secret=CLIENT_SECRET)
        global sp
        sp = spotipy.Spotify(auth_manager=auth_manager)
        test_playlist = sp.playlist("37i9dQZF1DXcBWIGoYBM5M")

        if not test_playlist:
            raise Exception("Could not connect to spotify")

        cprint(text="Connected to Spotify API succeessfully.", color="green")
    except Exception as e:
        cprint(text="Could not connect to Spotify..", color="red")
        cprint(text="Check your internet or change your .env file ",
               color="red")

    # playlist_link = "https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX"
    playlist_dict = sp.playlist(playlist_link)

    # slicing the playlist object for the needed stuff
    global playlist_name
    playlist_name = playlist_dict["name"]
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

    offset = 0

    for i in range(no_of_songs):
        df.loc[i, "songs"] = clean(items[i - offset]["track"]["name"])
        df.loc[i, "album"] = items[i - offset]["track"]["album"]["name"]
        df.loc[i, "release date"] = items[
            i - offset]["track"]["album"]["release_date"]

        images = [
            k["url"] for k in items[i - offset]["track"]["album"]["images"]
        ]
        ",".join(images)
        df.loc[i, "image"] = images

        artists = [
            clean(k["name"]) for k in items[i - offset]["track"]["artists"]
        ]
        artists = ",".join(artists)
        df.loc[i, "artists"] = artists

        if (i + 1) % 100 == 0:
            tracks = sp.next(tracks)
            items = tracks["items"]
            offset = i + 1

    global path
    path = os.path.join(os.getcwd(), "Playlists", f"{playlist_name}.txt")
    df.to_csv(path, sep="\t", index=False)


def search_spotify(name):
    results = sp.search(name)
    tracks = results.get_tracks()
    counter = 0
    for song in tracks:
        counter += 1
        cprint(f"{counter}. {song.name}", "green", end="")
        print(" by ", end="")
        cprint(f"{song.artists[0].name}", "yellow")
    choice = int(input("choose number: "))
    return tracks[choice]


if __name__ == "__main__":
    getSongs("https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX")
