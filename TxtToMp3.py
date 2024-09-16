from termcolor import cprint
from pytube import YouTube
import urllib.request
import pandas as pd
import SpotifyToTxt
import argparse
import asyncio
import aiohttp
import os
import re


def progressBar(stream, chunk, bytes_remaning):
  total_size = stream.filesize
  bytes_downloaded = total_size - bytes_remaning
  completion = (bytes_downloaded / total_size) * 100
  print(completion)


async def fetch_id(name, artist, session):
  query = f"{name}+{artist}"
  query = query.split(" ")
  query = "+".join(query)

  try:
    async with session.get(f"https://www.youtube.com/results?search_query={query}") as res:
      html = await res.text()
      id = re.findall(r'watch\?v=(\S{11})', html)
      return id[0] if id else None
  except Exception as e:
    cprint("Something went wrong while fetching video id", color="red")


async def download_audio(name, artist, path):

  async with aiohttp.ClientSession() as session:
    id = await fetch_id(name, artist, session)
    if (id):
      link = f"https://www.youtube.com/watch?v={id}"
      yt = YouTube(link, use_oauth=True, allow_oauth_cache=True)

      try:
        dName = await asyncio.to_thread(yt.streams.get_audio_only().download, path)
        newName = os.path.join(path, f"{name}.mp3")
        os.rename(dName, newName)
        cprint(f"{name} => {link}", color="green")
      except Exception as e:
        cprint(f"Exception: {e}\nCode execution with continue shortly...", color="red")
    else:
      cprint(f"Failed to find video for name {name} by {artist}.", color='red')


async def process_playlist():
  SpotifyToTxt.getSongs(args.spotify)
  df = pd.read_csv(SpotifyToTxt.path, sep="\t")

  # Download path for the playlist
  path = os.path.join("Downloads", "Playlists", SpotifyToTxt.playlist_name)
  os.makedirs(path, exist_ok=True)
  print()

  tasks = []

  for song, artist in zip(df["songs"], df["artists"]):
    tasks.append(download_audio(song, artist, path))
  await asyncio.gather(*tasks)

  os.remove(SpotifyToTxt.path)


async def process_singles():
  SpotifyToTxt.search_spotify(args.name)
  search = pd.read_csv(SpotifyToTxt.path, sep='\t')

  path = os.path.join("Downloads", "Singles")
  os.makedirs(path, exist_ok=True)

  tasks = []

  for name, artist in zip(search['songs'], search['artists']):
    tasks.append(download_audio(name, artist, path))
  await asyncio.gather(*tasks)

  os.remove(os.path.join("queue", "queue.txt"))


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("-s", "--spotify", help="Link to a spotify playlist")
  parser.add_argument("-n", "--name", nargs='+', help="Usage: python TxtToMp3.py -n [song1] [song2] [song3]")
  parser.add_argument("-r", "--reset", action="store_true", help="Reset the Client id and secret in the .env file")

  args = parser.parse_args()

  if args.reset:
    SpotifyToTxt.set_credentials()
    exit()

  if not args.spotify and not args.name:
    print("Usage: python TxtToMp3.py -s [Link to spotify playlist]")
  elif args.spotify and args.name:
    print("Can only process one argument at a time..")

  if args.spotify:
    asyncio.run(process_playlist())

  elif args.name:
    asyncio.run(process_singles())
