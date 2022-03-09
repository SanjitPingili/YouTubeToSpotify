const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 8000; //Line 3
const session = require("express-session");
const cors = require("cors");
const config = require("./config");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/loginSpotify", require("./routes/loginSpotify"));
app.use("/callback", require("./routes/callbackSpotify"));
app.use("/express_backend", require("./routes/home"));
app.use("/logout", require("./routes/logout"));

app.use("/loginGoogle", require("./routes/loginGoogle"));
app.use("/callbackGoogle", require("./routes/callbackGoogle"));

app.use("/getSpotifyPlaylists", require("./routes/getSpotifyPlaylists"));
app.use("/getYoutubePlaylists", require("./routes/getYoutubePlaylists"));


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
