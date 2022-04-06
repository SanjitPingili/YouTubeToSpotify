const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");

router.get("/", (req, res) => {
  let BASE_URL = "https://api.spotify.com/v1/";
  let headers = { Authorization: "Bearer " + config.access_token };
  if (config.access_token != "") {
    request(
      {
        method: "GET",
        url: BASE_URL + "me/playlists",
        headers: headers,
        json: true,
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log("Playlist:\n\n");
          console.log(body);
          let names_spotify = [];
          let playlistIds = [];
          for (let i = 0; i < body["items"].length; i++) {
            names_spotify.push(body["items"][i].name);
            playlistIds.push(body["items"][i].id);
          }
          console.log(names_spotify);
          console.log(playlistIds);
          res.send({
            items: body["items"],
            names: names_spotify,
            playlists: playlistIds,
          });
        } else {
          console.log("Error fetching playlist");
        }
      }
    );
  }
});

module.exports = router;
