'use strict';

var PORT = process.env.PORT || 8080;
var http = require('http');
var express = require('express');
var app = express();
var appId = process.env.APP_ID;

app.get('/', function (req, res) {
  if (req.query.lat && req.query.lon) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + req.query.lat + '&lon=' + req.query.lon + '&appid=' + appId;
    http.get(url, function (httpRes) {
      var body = '';
      httpRes.on('data', function (chunk) {
        body += chunk;
      });
      httpRes.on('end', function () {
        res.send(body);
      });
    }).on('error', function (e) {
      console.log('HTTP error: ', e);
      res.send(e);
    });
  } else {
    res.send('Malformed query');
  }
});

app.listen(PORT, function () {
  console.log('Start listening on port ' + PORT);
});

/*
"http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appId
*/
