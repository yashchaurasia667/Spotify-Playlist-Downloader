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


@app.route('/', methods=['POST'])
def hello():
  data = request.get_json()
  if data['query']:
    if (data['qtype'].lower() == 'name'):
      tracks = SpotifyToTxt.search_gui(data['query'])
      create_song_list(tracks)
      return jsonify(success=True, songs=songs)
    if (data['qtype'].lower() == 'playlist'):
      tracks = SpotifyToTxt.search_gui(data['query'], qtype='playlist')
      return jsonify(success=True, cover=SpotifyToTxt.playlist_cover, name=SpotifyToTxt.playlist_name, songs=tracks)


if __name__ == '__main__':
  app.run(debug=True)
