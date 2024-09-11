import SpotifyToTxt
import pandas as pd
import urllib.request
import re
from pytube import YouTube
import os

# import string


def downloadAudio(name, artist):
    query = name + "+" + artist
    query = query.split(" ")
    query = "+".join(query)

    html = urllib.request.urlopen(
        f"https://www.youtube.com/results?search_query={query}"
    )
    id = re.findall(r"watch\?v=(\S{11})", html.read().decode())

    link = f"https://www.youtube.com/watch?v={id[0]}"
    yt = YouTube(link, use_oauth=True, allow_oauth_cache=True)

    yt.title = name
    try:
        yt.streams.get_audio_only().download(
            os.path.join(os.getcwd(), SpotifyToTxt.playlist_name)
        )
        os.rename(
            os.path.join(SpotifyToTxt.playlist_name, f"{name}.mp4"),
            os.path.join(SpotifyToTxt.playlist_name, f"{name}.mp3"),
        )
        print(f"{name} => {link}")
    except Exception as e:
        print(f"Exception: {e}")


df = pd.read_csv(SpotifyToTxt.path, sep="\t")

for song, artist in zip(df["songs"], df["artists"]):
    downloadAudio(song, artist)
