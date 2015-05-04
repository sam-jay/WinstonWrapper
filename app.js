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


  if (req.body.priority === 'high'){
	  sns.publish({
      TargetArn: 'arn:aws:sns:us-west-2:191148048684:winston_sns',
      Message: JSON.stringify(req.body.data)
    }, function(err, data){
  		if (err) console.log(err, err.stack);
  		else console.log(data);
	  });
  }
  else {

	sqs.sendMessage({
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/191148048684/winston',
    MessageBody: JSON.stringify(req.body.data)
  }, function(err,data){
		if(!err) {
      console.log('Message sent.');
      res.status(200).send();
    }
		else console.log(err, err.stack);
	});
  }
});

})()
