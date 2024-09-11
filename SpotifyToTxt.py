import spotipy
from spotipy import SpotifyClientCredentials
import pandas as pd
import re
import os

# import string

# authenticating with the spotify API
with open("./realCreds.txt") as f:
    [CLIENT_ID, CLIENT_SECRET] = f.read().split("\n")

# connecting with spotify API
auth_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# giving playlist link
playlist_link = "https://open.spotify.com/playlist/4tFABTdqmqEBGWptJ4Khgl"
playlist_dict = sp.playlist(playlist_link)

# slicing the playlist object for the needed stuff
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

items = playlist_dict["tracks"]["items"]

offset = 0

for i in range(no_of_songs):
    df.loc[i, "songs"] = items[i - offset]["track"]["name"]
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

path = os.path.join(os.getcwd(), "TextFiles", "data.txt")
df.to_csv(path, sep="\t", index=False)


# def clean(name):
#     unknowns = re.findall(r"\\x(\S{2})", name)
#     for unknown in unknowns:
#         name = name.replace("\\x" + unknown, "")
#     name = name.replace(name[0:2], "")
#     name = name.replace(name[len(name) - 1], "")
#     return name


# with open(os.path.abspath("TextFiles/byteName.txt"), "w") as f:
#     for i in range(len(song_list)):
#         songname = str(song_list[i].encode("utf-8", errors="replace"))
#         artist = str(artists_list[i].encode("utf-8", errors="replace"))
#         f.write(f"{songname}\t{artist}\t{album_list[i]}\t{release_date_list[i]}\n")

# for i in range(len(song_list)):
#     artists_list[i] = clean(str(artists_list[i].encode("utf-8", errors="replace")))
#     song_list[i] = clean(str(song_list[i].encode("utf-8", errors="replace")))
#     song_list[i] = song_list[i].translate(str.maketrans("", "", string.punctuation))

# with open(os.path.abspath("TextFiles/data.txt"), "w") as f:
#     for i in range(len(song_list)):
#         f.write(
#             f"{song_list[i]}\t{artists_list[i]}\t{album_list[i]}\t{release_date_list[i]}\n"
#         )

# with open(os.path.abspath("TextFiles/songs.txt"), "w") as f:
#     for song in song_list:
#         f.write(f"{song}\n")

import spotipy
from spotipy import SpotifyClientCredentials
import pandas as pd
import re
import os

# import string

# authenticating with the spotify API
with open("./credentials.txt") as f:
    [CLIENT_ID, CLIENT_SECRET] = f.read().split("\n")

# connecting with spotify API
auth_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

# giving playlist link
playlist_link = "https://open.spotify.com/playlist/4tFABTdqmqEBGWptJ4Khgl"
playlist_dict = sp.playlist(playlist_link)

# slicing the playlist object for the needed stuff
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

items = playlist_dict["tracks"]["items"]

offset = 0

for i in range(no_of_songs):
    df.loc[i, "songs"] = items[i - offset]["track"]["name"]
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

path = os.path.join(os.getcwd(), "TextFiles", "data.txt")
df.to_csv(path, sep="\t", index=False)


# def clean(name):
#     unknowns = re.findall(r"\\x(\S{2})", name)
#     for unknown in unknowns:
#         name = name.replace("\\x" + unknown, "")
#     name = name.replace(name[0:2], "")
#     name = name.replace(name[len(name) - 1], "")
#     return name


# with open(os.path.abspath("TextFiles/byteName.txt"), "w") as f:
#     for i in range(len(song_list)):
#         songname = str(song_list[i].encode("utf-8", errors="replace"))
#         artist = str(artists_list[i].encode("utf-8", errors="replace"))
#         f.write(f"{songname}\t{artist}\t{album_list[i]}\t{release_date_list[i]}\n")

# for i in range(len(song_list)):
#     artists_list[i] = clean(str(artists_list[i].encode("utf-8", errors="replace")))
#     song_list[i] = clean(str(song_list[i].encode("utf-8", errors="replace")))
#     song_list[i] = song_list[i].translate(str.maketrans("", "", string.punctuation))

# with open(os.path.abspath("TextFiles/data.txt"), "w") as f:
#     for i in range(len(song_list)):
#         f.write(
#             f"{song_list[i]}\t{artists_list[i]}\t{album_list[i]}\t{release_date_list[i]}\n"
#         )

# with open(os.path.abspath("TextFiles/songs.txt"), "w") as f:
#     for song in song_list:
#         f.write(f"{song}\n")
