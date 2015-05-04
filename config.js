(function() {
	'use strict';

	module.exports = {
		port: 4001,
		sqs: new aws.SQS({
	        region: 'us-east-1',
	        accessKeyId: '***',
	        secretAccessKey: '***',
		}),
		sns: new aws.SNS({
			region: 'us-east-1',
		    accessKeyId: '***',
			secretAccessKey: '***'
		})
	};

})()
