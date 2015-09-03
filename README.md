# express-console
Simple package for show console outputs to web browser.

## Usage

Here is simple code for example.

Just add this code to top of your script to request part:

```javascript
// Rewrite default console with console.
// Run express app on port 800 (default is 8080)
var console = require('express-console')(8000);

// Go to http://localhost:8000 (or other port)
function printRandomNumber() {
	var inter = Math.ceil(Math.random() * 3000);

	console.log('Print random number ' + inter);
	
	setTimeout(printRandomNumber, inter);
}

printRandomNumber();
```

