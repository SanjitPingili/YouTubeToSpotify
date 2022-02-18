import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  loginSpotify() {
    window.location.href = 'http://localhost:8000/loginSpotify';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Youtube To Spotify</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
        <button onClick={this.loginSpotify}>Login to Spotify</button>
      </div>
    );
  }
}

export default App;
