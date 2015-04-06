(function() {
  'use strict';
  var config = require('./config');

  var express = require('express');
  var parser = require('body-parser');
  var app = express();
  app.use(parser.json());

  app.listen(config.port);
  console.log("Listening on port: " + config.port);

  app.post('/logger/event', function(req, res) {
  	if (!req.body) return res.sendStatus(400);
  	console.log(req.body);
  	res.send('priority ' + req.body.priority + ' data: \n' + req.body.data);
  });

})()
