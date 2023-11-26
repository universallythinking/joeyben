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


app.use(express.static(__dirname + '/www'))
    .use(cookieParser());


app.listen(8080);

console.log("Visit http://localhost:8080 in your browser!");
