import spotipy
from spotipy import SpotifyClientCredentials
import re

with open('./credentials.txt') as f:
    [CLIENT_ID, CLIENT_SECRET] = f.read().split('\n')
    f.close()

# connecting with spotify api
auth_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

# giving playlist link
playlist_link = "-----YOUR SPOTIFY PLAYLIST LINK HERE----"
playlist_dict = sp.playlist(playlist_link)

no_of_songs = playlist_dict['tracks']['total']
    
album_list = []
song_list = []
release_date_list = []
artists_list = []

tracks = playlist_dict['tracks']
items = tracks['items']
offset = 0

i=0
while i<no_of_songs:
    song = items[i-offset]['track']['name']
    album = items[i-offset]['track']['album']['name']
    release_date = items[i-offset]['track']['album']['release_date']
    artists = [k['name'] for k in items[i-offset]['track']['artists']]
    artists = ','.join(artists)
    album_list.append(album)
    song_list.append(song)
    release_date_list.append(release_date)
    artists_list.append(artists)
    if (i+1)%100 == 0:
        tracks = sp.next(tracks)
        items = tracks['items']
        offset = i+1
    i+=1

def clean(name):
    unknowns = re.findall(r"\\x(\S{2})", name)
    for unknown in unknowns:
        name = name.replace('\\x'+unknown, '')
    name = name.replace(name[0:2], '')
    name = name.replace(name[len(name)-1], '')
    return name

for i in range(len(song_list)):
    artists_list[i] = clean(str(artists_list[i].encode('utf-8', errors='replace')))
    song_list[i] = clean(str(song_list[i].encode('utf-8', errors='replace')))

with open('data.txt', 'w') as f:
    for i in range(len(song_list)):
        f.write(f'{song_list[i]}\t{artists_list[i]}\t{release_date_list[i]}\n')

with open ('songs.txt', 'w') as f:
    for song in song_list:
        f.write(f"{song}\n")
