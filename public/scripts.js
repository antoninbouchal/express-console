var socket = null;
var last_date = null;

var $console_out = $("#console_out");

$(function () {
	socket = io.connect();

    // Emit ready event.
    socket.emit('ready');

    //Get initials data
    socket.on('inits', function (data) {
    	for (var i = 0; i < data.length; i++) {
    		print_out(data[i][0], data[i][1]);
    	}
    	print_connect();
    });

    socket.on('disconnect', function (err) {
    	print_connect(1);
    })

    socket.on('out', function (data) { print_out(data[0], data[1]); });
});

function print_out(date, string, type) {
	var scroll = false;
	var dHeight = $(document).scrollTop() + $(window).height();
	var sTop = $(document).outerHeight();

	//Move scroll
	if (dHeight == sTop) {
		scroll = true;
	}

	date = new Date(date);
	var hh = date.getHours();
	var mm = date.getMinutes(); 
	var ss = date.getSeconds();
	var dd = date.getDay();
	var mm = date.getMonth() + 1;
	var yy = date.getFullYear();

	date = dd + "." + mm + "." + yy;

	if (last_date !== date) {
		print_date(date);
	}

	var $time = $('<span></span>');
	$time.html(hh + "h " + mm + "m " + ss + "s: ");

	$time.addClass('time');


	var $p = $('<p></p>');
	$p.addClass('line')
	$p.append($time);
	$p.append(string);

	if (type) {
		$p.addClass('text-' + type);
	}

	$console_out.append($p);

	if (scroll) {
		$(window).scrollTop(dHeight);
	}
}

function print_date(string) {
	$p = $("<p></p>");
	$p.addClass('date');
	$p.append(string);
	$console_out.append($p);
	last_date = string;
}

function print_connect(disconnect) {
	$p = $("<p></p>");

	if (disconnect) {
		$p.addClass('disconnect');
		$p.append('Disconnected from console');
	} else {
		$p.addClass('connect');
		$p.append('Connected to console');
	}
	$console_out.append($p);
}