var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = 3001;

var peopleData = require('./peopleData');
console.log("== peopleData", peopleData);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

app.get('/kitten', function (req, res, next) {
  res.status(200).render('photoPage', {
    name: "Kitten",
    photos: [
      {
        url: "http://placekitten.com/480/480?image=8",
        caption: "Kitty"
      },
      {
        url: "http://placekitten.com/480/480?image=3",
        caption: "Another kitty"
      }
    ],
    displayTheParagraph: true
  });
});

// var availablePeople = [
//   'luke',
//   'leia',
//   'rey',
//   'finn',
//   'r2d2'
// ];
app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (peopleData[person]) {
    res.status(200).render('photoPage', peopleData[person]);
    // res.status(200).sendFile(
    //   __dirname + '/public/people/' + person + '.html'
    // );
  } else {
    next();
  }
});

app.get("*", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
