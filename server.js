/* 
 * This is the backend of the web application. This file can be run
 * using node. First execute
 *     npm install express
 *     npm install body-parser
 * Next, execute
 *     node server.js
 *
 * Visit the frontend at http://localhost:3000/RegisterBits.html
 *
*/
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// required to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//tell web framework to serve files from /static_files
var path = require('path');
var rootPath = path.normalize(__dirname + '/');
app.use(express.static(rootPath + '/static_files'));

// use an array instead of a real database
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

// port is determined dynamically
app.listen(port, function() {
    console.log('Server started at http://localhost:%s/', port);
})
// use this for testing purposes when calling 'node server.js'
//var server = app.listen(3000, function () {
//  var port = server.address().port;
//  console.log('Server started at http://localhost:%s/', port);
//});
