const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const BASE_URL = "https://www.googleapis.com/youtube/v3"
const headers =  {'Authorization': 'Bearer ' + config.youtube_access_token};


async function getChannelID() {
    let id = "";
    let channelID = await request (
        {
            method: "GET",
            url: BASE_URL + "/channels?part=snippet?forUsername=GoogleDevelopers?key=AIzaSyCUOqeMrYyOi-7O26Vb3SKWIvnuZ48uGr4",
            headers: headers,
            json: true,
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                console.log(body);
                id = body["items"]["id"];
            }
        }
    );

    return id;
}


async function getPlaylists() {
    let playlists = [];
    let playlistsReq = await request(
        {
            method: "GET",
            url: BASE_URL + "/playlists?part=snippet&mine=true&key=AIzaSyCUOqeMrYyOi-7O26Vb3SKWIvnuZ48uGr4",
            headers: headers,
            json: true,
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                console.log("Youtube Playlist:\n\n");
                console.log(body);
                playlists = body["items"];
            } else {
              console.log("Error fetching Youtube playlist");
              console.log(response.statusCode);
            }
        }
    );
    return playlists;
}



router.get("/", (req, res) => {
  if (config.youtube_access_token != "") {
    let id = "";
    request (
            {
                method: "GET",
                url: BASE_URL + "/channels?part=snippet?mine=true?key=AIzaSyCUOqeMrYyOi-7O26Vb3SKWIvnuZ48uGr4",
                headers: headers,
                json: true,
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    id = body["items"]["id"];
                    console.log(id);
                } else {
                    console.log("Error Getting Youtube Channel ID");
                    console.log(body);
                }
            }
        );
    // let playlists = getPlaylists();
    /*
    res.send({
       itemsYT: playlists,
    });
    */
  }
});

module.exports = router;
