var randomInt = require('random-int');

module.exports = {
	name: 'randint',
	description: 'Generate a random number',
	usage: '<lower> <upper>',
	args: true,
	execute(message, args) {
		Console.log('A ting');

		const int = randomInt(args[0], args[1]);
		message.channel.send(`The number is: ${int}`);
	},
};