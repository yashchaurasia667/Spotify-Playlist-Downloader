from flask import Flask, request, jsonify
import pandas as pd
import SpotifyToTxt

app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello():
  data = request.get_json()
  if data['query']:
    if (data['qtype'] == 'Playlist'):
      tracks = SpotifyToTxt.search_gui(data['query'])
      songs = []
      # for idx, track in enumerate(tracks['tracks']['items']):
      #   songs.append({
      #     'index': idx+1,
      #     'name': track['name'],
      #     'album': track['album']
      #   })
      # print(tracks['tracks']['items'][0]['album'])
      return jsonify(success=True, name=tracks['tracks']['items'][0]['album']['name'])
    return jsonify(message="names recieved")


if __name__ == '__main__':
  app.run(debug=True)
