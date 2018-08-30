var randomInt = require('random-int');

module.exports = {
	name: 'randint',
	description: 'Generate a random number',
	usage: '<lower> <upper>',
	args: true,
	execute(message, args) {
		const int = randomInt(parseInt(args[0]), parseInt(args[1]));
		message.channel.send(`The number is: ${int}`);
	},
};