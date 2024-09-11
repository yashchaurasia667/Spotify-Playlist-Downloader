# Spotify-Playlist-Downloader

You'll need to have Spotify for Developers to use this tool as it uses the Spotify API to fetch songs from the playlist
You can get a spotify developers account by following this link: https://developer.spotify.com/

After that change the credentials.txt file according to the instructions in the file

Then install requirements.txt with
pip install -r requirements.txt

Then open the SpotifyToTxt.py and change the playlist_link to your playlist, and while you're there also change the realCreds.txt to credentials.txt.

Also don't forget to change the regex in the cipher.py file in the pytube lib according to whatever youtube's current frontend is
r'a\.[a-zA-Z]\s*&&\s*\([a-z]\s*=\s*a\.get\("n"\)\)\s*&&.*?\|\|\s*([a-z]+)',
r'\([a-z]\s*=\s\*([a-zA-Z0-9$]+)(\[\d+\])\([a-z]\)',

This regex works for now but prolly won't work for long.

Finally, Run the TxtToMp3.py file
