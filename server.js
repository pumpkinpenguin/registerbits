// Prerequisites - first run:
//   npm install express
//   npm install body-parser
//
// then run:
//   node server.js
//
// and the frontend can be viewed at http://localhost:3000/RegisterBits.html

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// put all of your static files (e.g., HTML, CSS, JS, JPG) in the static_files/
// sub-directory, and the server will serve them from there. e.g.,:
//
// http://localhost:3000/RegisterBits.html
// http://localhost:3000/CR.png
//
// will send the file static_files/CR.png to the user's Web browser
var path = require('path');
var rootPath = path.normalize(__dirname + '/');
app.use(express.static(rootPath + '/static_files'));

// simulates a database in memory, to make this example simple and
// self-contained (so that you don't need to set up a separate database).
// note that a real database will save its data to the hard drive so
// that they become persistent, but this fake database will be reset when
// this script restarts. however, as long as the script is running, this
// database can be modified at will.
var fakeDatabase = [
  	{myRegister: 'Floating Point Status and Control', myBoundary: '01010101010101010000101010101011', myImage: 'FPSC.png'},
	{myRegister: 'Condition Register', myBoundary: '00001111000011110000111100001111', myImage: 'CR.png'},
	{myRegister: 'Integer Exception Register', myBoundary: '01011111111111111111111110000000', myImage: 'IER.png'},
	{myRegister: 'Link Register', myBoundary: '11111111111111111111111111111111', myImage: 'LR.png'},
	{myRegister: 'Count Register', myBoundary: '11111111111111111111111111111111', myImage: 'CTR.png'}
];

app.get('/requested_register/*', function (req, res) {
  var nameToLookup = req.params[0]; // this matches the '*' part of '/users/*' above
  // try to look up in fakeDatabase
  for (var i = 0; i < fakeDatabase.length; i++) {
    var e = fakeDatabase[i];
    if (e.myRegister == nameToLookup) {
      res.send(e);
      return; // return early!
    }
  }

  res.send('{}'); // failed, so return an empty JSON object!
});

// start the server on http://localhost:3000/
app.listen(port, function() {
    console.log('Server started at http://localhost:%s/', port);
})
//var server = app.listen(3000, function () {
//  var port = server.address().port;
//  console.log('Server started at http://localhost:%s/', port);
//});
