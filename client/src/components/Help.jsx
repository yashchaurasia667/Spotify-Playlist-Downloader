import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="px-10 py-8">
      <ul>
        <li>
          <h1 className="font-bold text-4xl">How to Log in?</h1>
          <h2 className="">Get a Spotify for Developers account</h2>
          <p>
            You'll need a{" "}
            <Link to={"https://developer.spotify.com/"} target="_blank">
              Spotify for developers
            </Link>{" "}
            account to use this tool as it uses the Spotify API to fetch songs
            from the playlist.{" "}
          </p>
          <h2>Log in</h2>
          <p>
            Now that you have a spotify developers account navigate to the{" "}
            <Link to={"/login"}>Login</Link> page and enter your client id and
            client secret there and Log in
          </p>
        </li>
        <li>
          <h1>How to use the app?</h1>
          <p>
            Now that you're logged in you can should navigate to the{" "}
            <Link to={"/search"}>Search</Link> page and on the left side of the
            searchbar choose if you want to download a playlist or a song. After
            that just search for the song click search and download whichever
            song your heart desires.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Help;
