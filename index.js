const http = require('http');
const port = process.env.PORT || 3000;
const express = require('express'); // Express web server framework
const cookieParser = require('cookie-parser'); // Express web server framework

var app = express();

var nodemailer = require('nodemailer');

var maillist = [
  'thejkbxapp@gmail.com',
  'josephedaquila@gmail.com'
];

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aplusneveraminus@gmail.com',
    pass: 'zuguingmtigigugz'
  }
});

app.get('/contact', function(req, res) {
  var q = req.query;
  var first, email, phone, message;
  first = q.name;
  email = q.email;
  phone = q.phone;
  message = q.message;
  mailOptions = {
    from: 'aplusneveraminus@gmail.com',
    to: maillist,
    subject: 'New contact from website...',
    text: first + '.\n' + email + '.\n' + phone + '.\n' + message
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });

});


const YouTube = require("youtube-sr").default;

app.get("/search", function(req,res) {
  //Initialize variables to hold our response data
  var videos;
  var arr = [];
  var obj = {};
  var q = req.query.data; //searchQuery from the JS OBJ in index.html
  YouTube.search(q, { limit: 100, type: "video" })
    .then(x => {
      videos = x;
      videos.forEach( function ( v ) {
        obj = {};
        obj.url = v.url;
        obj.title = v.title;
        obj.timestamp = v.duration;
        obj.thumbnail = v.thumbnail.url;
        obj.videoId = v.id;
        arr.push(obj);
      });
      var responseBody = {};
      responseBody.body = arr;
      res.send(JSON.stringify(responseBody));
    })
    .catch(console.error);
});

app.use(express.static(__dirname + '/www'))
    .use(cookieParser());


app.listen(8080);

console.log("Visit http://localhost:8080 in your browser!");
