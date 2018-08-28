const snekfetch = require('snekfetch');

module.exports = {
	name: 'git',
	description: 'Github commands',
	aliases: ['github'],
	args: true,
	async execute(message, args) {
		if (args[0] == 'zen') {
		    const { body } = await snekfetch.get('https://api.github.com/zen');
			message.channel.send(`GitHub Zen Principle: ${body}`);

		}
		else if (args[0] == 'user') {
			const { body } = await snekfetch.get(`https://api.github.com/users/${args[1]}`);
			message.channel.send(`${args[1]}'s Bio: ${body.bio}`);
		}
	},
};