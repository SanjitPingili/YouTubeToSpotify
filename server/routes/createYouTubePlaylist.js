const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");

router.get("/", (req, res) => {
  let playlistName = req.query.name;
  let BASE_URL = "https://www.googleapis.com/youtube/v3/playlists?";
  let authHeaders = { Authorization: "Bearer " + config.youtube_access_token };
  let postBody = '{"snippet": {"title": "' + playlistName + '"}}';
  console.log(postBody);
  var options = {
    method: "POST",
    url: BASE_URL + "part=snippet&key=" + config.youtube_api_key,
    headers: authHeaders,
    body: postBody,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("Successfully created playlist");
    console.log(response.body);
    let body = JSON.parse(response.body);
    let id = body.id;
    console.log(id);
    res.send({
      id,
    });
  });
});

module.exports = router;
