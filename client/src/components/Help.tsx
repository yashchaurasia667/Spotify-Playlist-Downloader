import { Link } from "react-router-dom";

const Help = () => {
  const heading = "font-bold text-4xl mb-4 text-purple-500";
  const subheading = "font-bold text-2xl mb-2 text-purple-200";
  const link = "text-purple-500 font-semibold";

  return (
    <div className="px-4 py-8">
      <ul>
        <li className="mb-12">
          <h1 className={heading}>How to Log in?</h1>
          <h2 className={subheading}>Get a Spotify for Developers account</h2>
          <p className="mb-10">
            You'll need a{" "}
            <Link
              to={"https://developer.spotify.com/"}
              target="_blank"
              className={link}
            >
              Spotify for developers
            </Link>{" "}
            account to use this tool as it uses the Spotify API to fetch songs
            from the playlist.{" "}
          </p>
          <h2 className={subheading}>Log in</h2>
          <p>
            Now that you have a spotify developers account navigate to the{" "}
            <Link to={"/login"}>Login</Link> page and enter your client id and
            client secret there and Log in
          </p>
        </li>
        <li>
          <h1 className={heading}>How to use the app?</h1>
          <p>
            Now that you're logged in you can should navigate to the{" "}
            <Link to={"/"} className={link}>
              Search
            </Link>{" "}
            page and on the left side of the searchbar choose if you want to
            download a playlist or a song. After that just search for the song
            click search and download whichever song your heart desires.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Help;
