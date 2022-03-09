import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    loggedIn: false,
    username: "Not Logged In",
    playlistsSpotify: [],
    item: [],
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
          //item: res.items[0],
        })
      )
      .catch((err) => console.log(err));
  }

  playlistSpotify = async () => {
    const response = await fetch("/getSpotifyPlaylist");
    const body = await response.json();

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

  render() {
    const isLoggedIn = this.state.loggedIn;
    let button;
    if (!isLoggedIn) {
      button = <button onClick={this.loginSpotify}>Login to Spotify</button>;
    } else {
      button = <button onClick={this.logoutSpotify}>Logout of Spotify</button>;
      let names = [];
      for (let i = 0; i < this.state.playlistsSpotify.length; i++) {
        this.state.item = this.state.playlistsSpotify[i];
        names[i] = this.state.item.name;
        console.log(names[i]);
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Youtube To Spotify</h1>
          <p className="App-intro">{this.state.username}</p>
          <div>
            <p>{button}</p>
            <p>
              <button onClick={this.loginYoutube}>Login to Youtube</button>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
