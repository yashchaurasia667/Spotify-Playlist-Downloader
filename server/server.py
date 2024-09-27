from flask import Flask, request, jsonify
import SpotifyToTxt

app = Flask(__name__)


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
    tracks = SpotifyToTxt.search_gui(query)
    create_song_list(tracks)
    return jsonify(success=True, songs=songs)
  except Exception as e:
    return jsonify(message='Could not find a song with that name...', success=False)


def searchPlaylists(query):
  try:
    tracks = SpotifyToTxt.search_gui(query, qtype='playlist')
    if tracks:
      return jsonify(success=True, cover=SpotifyToTxt.playlist_cover, name=SpotifyToTxt.playlist_name, songs=tracks)
    raise Exception(404)
  except:
    return jsonify(message="Could not find the a playlist with that link, please check the playlist link and try again...", success=False)


@app.route('/', methods=['POST'])
def hello():
  data = request.get_json()
  if data['query']:
    if (data['qtype'].lower() == 'name'):
      return searchNames(data['query'])
    elif (data['qtype'].lower() == 'playlist'):
      return searchPlaylists(data['query'])
    else:
      return jsonify(success=False, message="You can only search for a playlist or a name")


if __name__ == '__main__':
  app.run(debug=True)
