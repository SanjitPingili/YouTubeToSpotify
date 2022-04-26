const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");

router.get("/", (req, res) => {
  let BASE_URL = "https://www.googleapis.com/youtube/v3/search?";
  let videoName = req.query.name;
  let headers = { Authorization: "Bearer " + config.youtube_access_token };
  if (config.youtube_access_token != "") {
    request(
      {
        method: "GET",
        url:
          BASE_URL +
          "part=snippet&maxResults=5&q=" +
          videoName +
          "&type=video&key=" +
          config.youtube_api_key,
        headers: headers,
        json: true,
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          //console.log(body["items"][0].snippet.title);
          let id = body["items"][0].id.videoId;
          console.log(id);
          res.send({
            id,
          });
        } else {
          console.log("Error fetching playlist");
        }
      }
    );
  }
});

module.exports = router;
