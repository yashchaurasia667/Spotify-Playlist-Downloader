import SpotifyToTxt
import urllib.request
import re
from pytube import YouTube
import os

def youtubeLink(name):
    query = name.split(" ")
    query = "+".join(query)
    html = urllib.request.urlopen(f"https://www.youtube.com/results?search_query={query}")
    id = re.findall(r"watch\?v=(\S{11})", html.read().decode())
    return f"https://www.youtube.com/watch?v={id[0]}"

def downloadAudio(link):
    yt = YouTube(link)
    yt.streams.get_audio_only().download()
    os.rename(f"./{yt.title}.mp4", f"./Songs/{yt.title}.mp4")

i=1
for song in SpotifyToTxt.song_list:
    if song == "":
        break
    if "’" in song:
        song = song.replace("’", "")
    Link = youtubeLink(song)
    print(f"{song}=> {Link}")
    downloadAudio(Link)