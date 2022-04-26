const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");

router.get("/", (req, res) => {
  let playlistID = req.query.pID;
  let videoID = req.query.vID;
  let BASE_URL = "https://www.googleapis.com/youtube/v3/playlistItems?";
  let authHeaders = { Authorization: "Bearer " + config.youtube_access_token };
  let postBody =
    '{"snippet": {"playlistId": "' +
    playlistID +
    '", "resourceId": {"kind": "youtube#video","videoId": "' +
    videoID +
    '"}}}';
  console.log(postBody);
  var options = {
    method: "POST",
    url: BASE_URL + "part=snippet&key=" + config.youtube_api_key,
    headers: authHeaders,
    body: postBody,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("Successfully updated playlist");
    res.send({
      response,
    });
  });
});

module.exports = router;
