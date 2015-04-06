(function() {
  'use strict';
  var config = require('./config');

  var express = require('express');
  var parser = require('body-parser');
  var aws = require('aws-sdk');

  var app = express();
  app.use(parser.json());

  app.listen(config.port);
  console.log("Listening on port: " + config.port);

  var sns = new aws.SNS({
	region: 'us-east-1',
        accessKeyId: '***',
        secretAccessKey: '***'
  });

  app.post('/logger/event', function(req, res){
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    var params = {
        TargetArn: '***',
	Message: req.body.data};
  
  sns.publish(params, function(err, data){
        if (err) console.log(err, err.stack);
        else console.log(data);
  });
});

})()
