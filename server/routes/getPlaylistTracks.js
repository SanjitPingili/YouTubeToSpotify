const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");

router.get("/", (req, res) => {
  let playlistID = req.query.id;
  let BASE_URL = "https://api.spotify.com/v1/";
  let headers = { Authorization: "Bearer " + config.access_token };
  if (config.access_token != "") {
    request(
      {
        method: "GET",
        url: BASE_URL + "playlists/" + playlistID + "/tracks",
        headers: headers,
        json: true,
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log("Playlist:\n\n");
          console.log;
          trackList = [];
          for (let i = 0; i < body["items"].length; i++) {
            trackList.push(body["items"][i].track.name);
          }
          console.log(trackList);
          res.send({
            trackList,
          });
        } else {
          console.log("Error fetching playlist");
        }
      }
    );
  }
});

// router.get("/", (req, res) => {
//   console.log(req.query.id);
// });

module.exports = router;
