const snekfetch = require('snekfetch');
var randomInt = require('random-int');

module.exports = {
	name: 'randProject',
	description: 'Picks a random project to work on',
	aliases: [`project`],
	async execute(message, args) {
		// Get markdown of all the projects
	    const { body } = await snekfetch.get('https://raw.githubusercontent.com/danistefanovic/build-your-own-x/master/README.md');
	    
	    // Get number of projects in markdown
		var numberOfProjects = 0
	    for (var i = 0; i < body.length; i++) {
	    	const char = String.fromCharCode(body[i]);
	    	if (char === '*') {
	    		if (String.fromCharCode(body[i+1]) === ' ' && String.fromCharCode(body[i+2]) === '[') {
	    			numberOfProjects++;
	    		}
	    	}
	    }

	    // Find the line that the project we picked is in
		const randInt = randomInt(1, numberOfProjects);
		var counter = 0;
		var line = 1;

		for (var i = 0; i < body.length; i++) {
	    	const char = String.fromCharCode(body[i]);
	    	if (char === '\n') {
	    		line++;
			}
			else if (char === '*') {
	    		if (String.fromCharCode(body[i+1]) === ' ' && String.fromCharCode(body[i+2]) === '[') {
	    			counter++;
	    			if (counter == randInt) {
	    				break;
	    			}
	    		}
	    	}
	    }

	    var lineCounter = 1;
	    var string = ""; 
	    for (var i = 0; i < body.length; i++) {
	    	const char = String.fromCharCode(body[i]);

	    	if (lineCounter === line) {
	    		if (char !== '\n') {
	    			string = string.concat(String(char));
	    		}
	    		else {
				    return message.channel.send(`The project is: ${string}`);
	    		}
	    	}

	    	else if (char === '\n') {
	    		lineCounter++;
			}
		}
	},
};