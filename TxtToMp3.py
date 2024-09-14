from termcolor import colored, cprint
from pytube import YouTube
import urllib.request
import pandas as pd
import SpotifyToTxt
import argparse
import os
import re


def progressBar(stream, chunk, bytes_remaning):
    total_size = stream.filesize
    bytes_downloaded = total_size - bytes_remaning
    completion = (bytes_downloaded / total_size) * 100
    print(completion)


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

    try:
        dName = yt.streams.get_audio_only().download(
            os.path.join(os.getcwd(), SpotifyToTxt.playlist_name)
        )
        os.rename(
            dName,
            os.path.join(SpotifyToTxt.playlist_name, f"{name}.mp3"),
        )
        dwl = colored(f"{name} => {link}", "green")
        cprint(dwl)
    except Exception as e:
        err = colored(f"Exception: {e}\nCode execution with continue shortly...", "red")
        cprint(err)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--spotify", help="Link to a spotify playlist")
    parser.add_argument("--name", help="Name of the song")

    args = parser.parse_args()

    print(args)

    # SpotifyToTxt.getSongs("https://open.spotify.com/playlist/4cr3CthlhRX7sSrXpkFrHX")

    # df = pd.read_csv(SpotifyToTxt.path, sep="\t")
    # for song, artist in zip(df["songs"], df["artists"]):
    #     downloadAudio(song, artist)
