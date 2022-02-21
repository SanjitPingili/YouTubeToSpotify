const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

 router.get("/", (req, res) => {
    config.loggedOut = true;
    res.redirect(`http://localhost:${config.clientPort}`);
 });

module.exports = router;
