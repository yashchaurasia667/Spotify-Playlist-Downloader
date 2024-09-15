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


def downloadAudio(name, artist, path):
    query = name + "+" + artist
    query = query.split(" ")
    query = "+".join(query)

    html = urllib.request.urlopen(
        f"https://www.youtube.com/results?search_query={query}")
    id = re.findall(r"watch\?v=(\S{11})", html.read().decode())

    link = f"https://www.youtube.com/watch?v={id[0]}"
    yt = YouTube(link, use_oauth=True, allow_oauth_cache=True)

    try:
        dName = yt.streams.get_audio_only().download(
            os.path.join(os.getcwd(), "Downloads", SpotifyToTxt.playlist_name))
        os.rename(
            dName,
            os.path.join("Downloads", SpotifyToTxt.playlist_name,
                         f"{name}.mp3"),
        )
        dwl = colored(f"{name} => {link}", "green")
        cprint(dwl)
    except Exception as e:
        err = colored(
            f"Exception: {e}\nCode execution with continue shortly...", "red")
        cprint(err)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--spotify", help="Link to a spotify playlist")
    parser.add_argument("-n", "--name", nargs='+', help="Name of the song")
    parser.add_argument("-r",
                        "--reset",
                        action="store_true",
                        help="Reset the Client id and secret in the .env file")

    args = parser.parse_args()

    if args.reset:
        SpotifyToTxt.set_credentials()
        exit()

    if not args.spotify and not args.name:
        print("Usage: python TxtToMp3.py -s [Link to spotify playlist]")
    elif args.spotify and args.name:
        print("Can only process one argument at a time..")

    if args.spotify:
        SpotifyToTxt.getSongs(args.spotify)
        df = pd.read_csv(SpotifyToTxt.path, sep="\t")

        if (not os.path.exists("Playlists")):
            os.mkdir("Downloads")

        for song, artist in zip(df["songs"], df["artists"]):
            downloadAudio(song, artist)
    elif args.name:
        search = {}
        for name in args.name:
            query = SpotifyToTxt.search_spotify(name)
            print(query)
            downloadAudio(query[0], query[1])
