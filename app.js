(function() {
  'use strict';
  var config = require('./config');

  var express = require('express');
  var parser = require('body-parser');
  var app = express();
  app.use(parser.json());

  app.listen(config.port);
  console.log("Listening on port: " + config.port);

  var SNS_KEY_ID = process.env['SNS_KEY_ID'],
  SNS_ACCESS_KEY = process.env['SNS_ACCESS_KEY'];

  var sns = new AWS.SNS({
    region: 'us-east-1',
    accessKeyId: SNS_ACCESS_KEY,
    secretAccessKey: SNS_KEY_ID
  });

  app.post('/logger/event', function(req, res){
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    sns.publish({topic: "winston", message: req.body.data}, function(err, res){
        if (err) console.log(err, err.stack);
        else console.log(req.body.data);
  });
});

})()
