import spotipy
from spotipy import SpotifyClientCredentials
import pandas as pd
import os
import re
import unicodedata

# authenticating with the spotify API
with open("./realCreds.txt") as f:
    [CLIENT_ID, CLIENT_SECRET] = f.read().split("\n")

# connecting with spotify API
auth_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)


def clean(name):
    windows_invalid_pattern = r'[\\/:*?">|]'
    cleaned_name = re.sub(windows_invalid_pattern, "", name)

    # Normalize Unicode characters and remove non printable characters
    cleaned_name = unicodedata.normalize("NFKD", cleaned_name)
    cleaned_name = re.sub(r"[^\x00-\x7F]+", "", cleaned_name)

    # Replace invalid characters after unicode normalizing
    cleaned_name = re.sub(windows_invalid_pattern, "", cleaned_name)

    # Remove trailing spaces and periods
    cleaned_name = cleaned_name.strip(" .")

    # Windows allows filenames upto 255 characters
    if len(cleaned_name) > 255:
        cleaned_name = cleaned_name[:255]

    return cleaned_name


def getSongs(playlist_link):
    # giving playlist link
    # playlist_link = "https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX"
    playlist_dict = sp.playlist(playlist_link)

    # slicing the playlist object for the needed stuff
    global playlist_name
    playlist_name = playlist_dict["name"]
    no_of_songs = playlist_dict["tracks"]["total"]

    # creating a dataframe for storing all the data
    df = pd.DataFrame(
        {
            "songs": pd.Series(dtype="str"),
            "artists": pd.Series(dtype="str"),
            "album": pd.Series(dtype="str"),
            "release date": pd.Series(dtype="str"),
            "image": pd.Series(dtype="str"),
        }
    )

    tracks = playlist_dict["tracks"]
    items = tracks["items"]

    offset = 0

    for i in range(no_of_songs):
        df.loc[i, "songs"] = clean(items[i - offset]["track"]["name"])
        df.loc[i, "album"] = items[i - offset]["track"]["album"]["name"]
        df.loc[i, "release date"] = items[i - offset]["track"]["album"]["release_date"]

        images = [k["url"] for k in items[i - offset]["track"]["album"]["images"]]
        ",".join(images)
        df.loc[i, "image"] = images

        artists = [k["name"] for k in items[i - offset]["track"]["artists"]]
        artists = ",".join(artists)
        df.loc[i, "artists"] = artists

        if (i + 1) % 100 == 0:
            tracks = sp.next(tracks)
            items = tracks["items"]
            offset = i + 1

    global path
    path = os.path.join(os.getcwd(), "TextFiles", "data.txt")
    df.to_csv(path, sep="\t", index=False)
