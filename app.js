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

  var sns = config.sns;
  var sqs = config.sqs;

  app.post('/logger/event', function(req, res){
    console.log('got new event')
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
	QueueUrl: 'https://sqs.us-west-2.amazonaws.com/191148048684/winston',
	MessageBody: JSON.stringify(req.body.data)};

	sqs.sendMessage(params, function(err,data){
		if(!err) {
      console.log('Message sent.');
      res.status(200).send();
    }
		else console.log(err, err.stack);
	});
  }
});

})()
