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

  var sqs = new aws.SQS({
        region: 'us-east-1',
        accessKeyId: '***',
        secretAccessKey: '***',
  });

  app.post('/logger/event', function(req, res){
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);

    var params = {
        TargetArn: 'arn:aws:sns:us-east-1:216982984213:winston',
	Message: req.body.data};

  if (req.body.priority === 'high'){
	  sns.publish(params, function(err, data){
		if (err) console.log(err, err.stack);
		else console.log(data);
	  });
  }
  else{
	var params = {
	QueueUrl: 'https://sqs.us-east-1.amazonaws.com/216982984213/winston',
	MessageBody: req.body.data};

	sqs.sendMessage(params, function(err,data){
		if(!err) console.log('Message sent.');
		else console.log(err, err.stack);
	});
  }
});

})()
