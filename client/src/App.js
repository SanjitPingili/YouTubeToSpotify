import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    loggedIn: false,
    loggedInYouTube: false,
    username: "Not Logged In",
    playlistsSpotify: [],
    playlistsYoutube: [],
    snippetYoutube: [],
    item: [],
    itemYT: [],
    isActive: false,
    isActiveYT: false,
    names: [],
    playlistIds: [],
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) =>
        this.setState({
          data: res.express,
          loggedIn: res.login,
          username: res.name,
        })
      )
      .catch((err) => console.log(err));

    this.playlistSpotify()
      .then((res) =>
        this.setState({
          playlistsSpotify: res.items,
          names: res.names,
          playlistIds: res.playListIDs,
        })
      )
      .catch((err) => console.log(err));

    this.playlistYoutube()
      .then((res) =>
        this.setState({
          playlistsYoutube: res.itemsYT,
        })
      )
      .catch((err) => console.log(err));
  }

  playlistSpotify = async () => {
    const response = await fetch("/getSpotifyPlaylists");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  playlistYoutube = async () => {
    let response = await fetch("/getYoutubePlaylists");
    let body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  loginSpotify() {
    window.location.href = "http://localhost:8000/loginSpotify";
  }

  logoutSpotify() {
    window.location.href = "http://localhost:8000/logout";

    /*const url = 'https://www.spotify.com/logout/'
      let left = (screen.width/2)-(700/2);
      let top = (screen.height/2)-(700/2);
      const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=700,top='+top+',left='+left);
      setTimeout(() => spotifyLogoutWindow.close(), 2000);*/
  }

  loginYoutube() {
    window.location.href = "http://localhost:8000/loginGoogle";
  }

  handleYoutube = (event) => {
    this.setState({ isActiveYT: !this.state.isActiveYT });
  };

  handleSpotify = (event) => {
    this.setState({ isActive: !this.state.isActive });
  };

  getID = (playListName) => {
    console.log(playListName);
    for (let i = 0; i < this.state.names.length; i++) {
      if (this.state.names[i] == playListName) {
        console.log(this.state.playlistIds[i]);
      }
    }
  };

  render() {
    const isLoggedIn = this.state.loggedIn;
    let button;
    if (!isLoggedIn) {
      button = <button onClick={this.loginSpotify}>Login to Spotify</button>;
    } else {
      button = <button onClick={this.logoutSpotify}>Logout of Spotify</button>;
      console.log("SPOTIFY");
      let names_spotify = [];
      for (let i = 0; i < this.state.playlistsSpotify.length; i++) {
        this.state.item = this.state.playlistsSpotify[i];
        names_spotify[i] = this.state.item.name;
        console.log(names_spotify[i]);
      }
      console.log("YOUTUBE");
      for (let i = 0; i < this.state.playlistsYoutube.length; i++) {
        console.log(this.state.playlistsYoutube[i]);
      }
    }

    let title = "Youtube Playlists";
    let content = this.state.playlistsYoutube;
    let spotifyPlayListNames = this.state.names;
    let spotifyPlaylistIds = this.state.playlistIds;

    return (
      <div className="App">
        <header className="App-header">
          <div className="Visual" style={{ display: "flex", gap: "50px" }}>
            <img
              src="YouTube-logo-black-background.png"
              alt="Youtube"
              style={{ width: "300px", height: "200px" }}
            ></img>
            <img
              src="arrow-icon-18-256.png"
              alt="Arrow"
              style={{ width: "200px", height: "180px" }}
            ></img>
            <img
              src="Spotifyimg.png"
              alt="Spotify"
              style={{ width: "400px", height: "200px" }}
            ></img>
          </div>
          <h1 className="App-title">
            <span style={{ color: "red" }}>YouTube </span>
            <span style={{ color: "white" }}>To</span>
            <span style={{ color: "#013220" }}> Spotify</span>
          </h1>
          <p className="App-intro">{this.state.username}</p>
          {this.state.loggedIn && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <React.Fragment>
                <div className="accordion" style={{ marginRight: 20 }}>
                  <div className="accordion-item">
                    <div
                      onClick={() => {
                        this.handleYoutube();
                      }}
                      className="accordion-title"
                    >
                      <div>
                        {title} {this.state.isActiveYT ? "-" : "+"}
                        {"    "}
                      </div>
                    </div>
                    {this.state.isActiveYT &&
                      content.map((item) => <p>{item}</p>)}
                  </div>
                </div>
              </React.Fragment>
              <div>
                {"  "}|{"  "}
              </div>
              <React.Fragment>
                <div className="accordion" style={{ marginLeft: 20 }}>
                  <div className="accordion-item">
                    <div
                      onClick={() => {
                        this.handleSpotify();
                      }}
                      className="accordion-title"
                    >
                      <div>
                        {"    "}Spotify Playlists{" "}
                        {this.state.isActive ? "-" : "+"}
                      </div>
                    </div>
                    {this.state.isActive &&
                      spotifyPlayListNames.map((item) => (
                        <button onClick={() => this.getID(item)}>{item}</button>
                      ))}
                  </div>
                </div>
              </React.Fragment>
            </div>
          )}

          <div>
            <p>{button}</p>
            <p>
              <button onClick={this.loginYoutube}>Login to YouTube</button>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
