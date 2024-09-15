from termcolor import cprint
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
        dName = yt.streams.get_audio_only().download(path)
        os.rename(
            dName,
            os.path.join(path, f"{name}.mp3"),
        )
        cprint(f"{name} => {link}", color="green")
    except Exception as e:
        cprint(f"Exception: {e}\nCode execution with continue shortly...",
               color="red")


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
        path = os.path.join("Downloads", "Playlists",
                            SpotifyToTxt.playlist_name)
        os.makedirs(path, exist_ok=True)
        print()
        for song, artist in zip(df["songs"], df["artists"]):
            downloadAudio(song, artist, path)
        os.remove(SpotifyToTxt.path)
    elif args.name:
        SpotifyToTxt.search_spotify(args.name)
        search = pd.read_csv(os.path.join("queue", "queue.txt"), sep='\t')

        path = os.path.join("Downloads", "Singles")
        os.makedirs(path, exist_ok=True)

        for name, artist in zip(search['songs'], search['artists']):
            downloadAudio(name, artist, path)

        os.remove(os.path.join("queue", "queue.txt"))
