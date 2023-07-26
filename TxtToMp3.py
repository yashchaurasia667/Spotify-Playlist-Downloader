import SpotifyToTxt
import urllib.request
import re
from pytube import YouTube
import os
import time
import string

def downloadAudio(name, artist):
    query = name+"+"+artist
    query = query.split(" ")
    query = "+".join(query)

    html = urllib.request.urlopen(f"https://www.youtube.com/results?search_query={query}")
    id = re.findall(r"watch\?v=(\S{11})", html.read().decode())

    link = f"https://www.youtube.com/watch?v={id[0]}"
    yt = YouTube(link, use_oauth=True, allow_oauth_cache=True)

    yt.title = yt.title.translate(str.maketrans('', '', string.punctuation))

    print(f"{name} => {link}")

    try:
        yt.streams.get_audio_only().download(os.path.abspath(f'./Songs'))
        if yt.title != name:
            os.rename(f"./Songs/{yt.title}.mp4", f"./Songs/{name}.mp4")
    except Exception as e:
        print(f"Exception: {e}")
        time.sleep(10)


for i in range(len(SpotifyToTxt.song_list)):
    SpotifyToTxt.song_list[i] = SpotifyToTxt.song_list[i].translate(str.maketrans('', '', string.punctuation))
    downloadAudio(SpotifyToTxt.song_list[i], SpotifyToTxt.artists_list[i])
