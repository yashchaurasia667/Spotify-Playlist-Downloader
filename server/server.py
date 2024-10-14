from flask import Flask, request, jsonify
import SpotifyToTxt
import TxtToMp3
import asyncio

app = Flask(__name__)

qtype = ''
SP = SpotifyToTxt.connect_spotify()


def create_song_list(tracks):
  global songs
  songs = []
  for idx, track in enumerate(tracks['tracks']['items']):
    songs.append({
        'index': idx + 1,
        'name': track['name'],
        'artists': [artist['name'] for artist in track['artists']],
        'album': track['album']['name'],
        'images': track['album']['images'][1]['url'],
        'duration': track['duration_ms'],
    })
  return songs


def searchNames(query):
  try:
    tracks = SpotifyToTxt.search_gui(query, sp=SP)
    create_song_list(tracks)
    return jsonify(success=True, songs=songs)
  except Exception as e:
    return jsonify(message='Could not find a song with that name...', success=False)


def searchPlaylists(query):
  try:
    tracks = SpotifyToTxt.search_gui(query, qtype='playlist', sp=SP)
    if tracks:
      return jsonify(success=True, cover=SpotifyToTxt.playlist_cover, name=SpotifyToTxt.playlist_name, songs=tracks)
    raise Exception(404)
  except:
    return jsonify(message="Could not find the a playlist with that link, please check the playlist link and try again...", success=False)


@app.route('/', methods=['POST'])
def search():
  data = request.get_json()
  if data['query'] and SP:
    global qtype
    print('searching')
    if (data['qtype'].lower() == 'name'):
      qtype = 'name'
      return searchNames(data['query'])
    elif (data['qtype'].lower() == 'playlist'):
      qtype = 'playlist'
      return searchPlaylists(data['query'])
    else:
      return jsonify(success=False, message="You can only search for a playlist or a name")


@app.route('/connect', methods=['POST'])
def connect():
  data = request.get_json()
  if (data):
    try:
      # data[0] is id and data[1] is secret
      global SP
      SP = SpotifyToTxt.connect_spotify(data['id'], data['secret'])
      if not SP:
        raise Exception('could not connect to spotify')
    except Exception:
      return jsonify(success=False, message="Couldn't connect to Spotify API check your id and secret and try again")
  return jsonify(success=True, message='Successfully connected to the Spotify API')


@app.route("/download", methods=['POST'])
def download():
  data = request.get_json()
  if data['song'] and data['path']:
    TxtToMp3.serverDownload = True
    if qtype == 'name':
      artists = ', '.join(data['song']['artists'])
      print(artists)
      asyncio.run(TxtToMp3.process_singles(name=data['song']['name'], artist=artists, serverPath=data['path']))
    return jsonify(success=True, message="Song downloaded")
  return jsonify(success=False, message="check your request params")


if __name__ == '__main__':
  app.run(debug=True)
