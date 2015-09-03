var express = require('express.io')
var app = express();

app.http().io()

var console_queue = [];

app.use('/', express.static(__dirname + '/public'));

app.io.route('ready', function (req) {
	req.io.emit('inits', console_queue);
});

var consoleHolder = console.log;

console.log = function (string) {
	var data = [ new Date(), string]
	console_queue.push(data);

	// Save only 100 last logs
	if (console_queue.length > 100) {
		console_queue = console_queue.slice(1);
	}

	app.io.broadcast('out', data);
	consoleHolder(string);
}

module.exports = function (port) {
	if ( ! port) {
		port = 8080;
	}

	app.listen(port);

	return console;
}