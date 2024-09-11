"""
{
Name: "name",
Path: "song path",
Artist: "artist",
Poster: "Poster Path",
Album: "Album"
Liked: true
}

<li onclick="changePlayerDetails(this)" class="currSong">
    <div class="song">
    <div class="number"></div>
    <div class="title"><img src="Posters/drunk text.jpg" width="40px">
        <span>
            <p class="song-name">drunk text</p>
            <p class="artist">Henry Moodie</p>
        </span>
    </div>
    <div class="album"><p>drunk text</p></div>
    <div class="date">2023-01-26</div>
    <div class="liked"><i class="fa-solid fa-heart"></i></div>
    <div class="duration"> 3:36</div>
    </div>
</li>

"""

from SpotifyToTxt import song_list, album_list, artists_list, images, release_date_list
# import urllib.request
import os


for i in range(len(song_list)):
    song = song_list[i]
    artist = artists_list[i]

    # with open(os.path.abspath("TextFiles/ObjectList.txt"), 'a') as f:
    #     f.write("{\n"+f'Name: "{song}",\nSong: new Audio("Songs/likedSongs/{song}.mp3"),\nArtist: "{artist}",\nPoster: "Posters/{song}.jpg",\nAlbum: "{album_list[i]}",\nLiked: true\n'+"},\n\n")

    with open(os.path.abspath("TextFiles/htmlList.txt"), 'a') as f:
        f.write(f'\t\t\t<li onclick="changePlayerDetails(this)">\n\
                <div class="song">\n\
                <div class="number"></div>\n\
                <div class="title"><img src="Posters/{song}.jpg" width="40px">\n\
                    <span>\n\
                        <p class="song-name">{song}</p>\n\
                        <p class="artist">{artist}</p>\n\
                    </span>\n\
                </div>\n\
                <div class="album"><p>{album_list[i]}</p></div>\n\
                <div class="date">{release_date_list[i]}</div>\n\
                <div class="liked"><i class="fa-solid fa-heart"></i></div>\n\
                <div class="duration"> 3:36</div>\n\
                </div>\n\
            </li>\n\n')

        # print(images[i][0]['url'] + f"=> {song}")
        # urllib.request.urlretrieve(images[i][0]['url'], os.path.abspath(f"Posters/{song}.jpg"))
        # print('Download Complete...')
