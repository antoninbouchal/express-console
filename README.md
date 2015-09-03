# express-console
Simple package allowing to show console output to web browser

## Instalation
Via npm:
```
npm install express-console
```

Via github:
```
npm install "git+https://github.com/Scorpio1337/express-console.git"
```

## Usage

Here is simple code for example.

Just add this code to top of your script to request part:

```javascript
// Rewrite default console with console.
// Run express app on port 8000 (default is 8080)
console = require('express-console')(8000);

// Go to http://localhost:8000 (or other port)
function printRandomNumber() {
	var inter = Math.ceil(Math.random() * 3000);

	console.log('Print random number ' + inter);
	
	setTimeout(printRandomNumber, inter);
}

printRandomNumber();
```

