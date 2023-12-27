const http = require("http");
const port = process.env.PORT || 3000;
const express = require("express"); // Express web server framework
const cookieParser = require("cookie-parser"); // Express web server framework

var app = express();

var nodemailer = require("nodemailer");

var maillist = ["thejkbxapp@gmail.com", "josephedaquila@gmail.com"];

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aplusneveraminus@gmail.com",
    pass: "zuguingmtigigugz",
  },
});

app.get("/contact", function (req, res) {
  var q = req.query;
  var first, email, phone, message;
  first = q.name;
  email = q.email;
  phone = q.phone;
  message = q.message;
  mailOptions = {
    from: "aplusneveraminus@gmail.com",
    to: maillist,
    subject: "New contact from website...",
    text: first + ".\n" + email + ".\n" + phone + ".\n" + message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });
});

const YouTube = require("youtube-sr").default;

app.get("/search", function (req, res) {
  //Initialize variables to hold our response data
  var videos;
  var arr = [];
  var obj = {};
  var q = req.query.data; //searchQuery from the JS OBJ in index.html
  YouTube.search(q, { limit: 100, type: "video" })
    .then((x) => {
      videos = x;
      videos.forEach(function (v) {
        obj = {}; //reset the object
        obj.url = v.url; //add the object properties
        obj.title = v.title;
        obj.timestamp = v.duration;
        obj.thumbnail = v.thumbnail.url;
        obj.videoId = v.id;
        arr.push(obj); //push the object into an array, to be parsed later
      });
      var responseBody = {};
      responseBody.body = arr;
      res.send(JSON.stringify(responseBody)); //send the response to the front end
    })
    .catch(console.error);
});

app.use(express.static(__dirname + "/www")).use(cookieParser());

/* ADDED THIS */
const AutoComplete = require("youtube-autocomplete");
//take in the "/query" ajax call from autocomplete.js
app.get("/query", function (req, res) {
  AutoComplete(req.query.data, (err, queries) => {
    // req.query.data is the current text from the searchbox in index.html
    if (err) throw err;
    res.send(queries); //send the response data back to the front end AJAX call in autocomplete.js
    console.log(queries);
  });
});
/* END ADDED CODE */

const { dlAudio } = require("youtube-exec");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
app.get("/download", function (req, res) {
  // Using Promises
  dlAudio({
    url: req.query.data,
    folder: "downloads", // optional, default: "youtube-exec"
    quality: "lowest", // or "lowest"; default: "best"
  })
    .then(() => {
      console.log("Audio downloaded successfully! 🔊🎉");
    })
    .catch((err) => {
      console.error("An error occurred:", err.message);
    });
});

var hostPort = 8080;

app.listen(hostPort);

console.log("Visit http://localhost:" + hostPort + " in your browser!");
