const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const querystring = require("querystring");

let generateCookie = function () {
  let result = "";
  let values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 16; i++) {
    result += values.charAt(Math.floor(Math.random() * values.length));
  }
  return result;
};

let authorize = "https://accounts.google.com/o/oauth2/v2/auth?";

let redirect_uri = config.youtube_redirect_uri;

let scope = "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner-channel-audit";

router.get("/", (req, res) => {
  config.youtube_state = generateCookie();
  res.cookie(config.youtube_state_key, config.youtube_state);

  res.redirect(
    authorize +
      querystring.stringify({
        client_id: config.youtube_client_id,
        redirect_uri: redirect_uri,
        scope: scope,
        response_type: 'code',
        prompt: "consent",
        include_granted_scopes: true,
        state: config.youtube_state,
      })
  );
});

module.exports = router;
