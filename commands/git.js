const snekfetch = require('snekfetch');

module.exports = {
	name: 'git',
	description: 'Github commands',
	aliases: ['github'],
	usage: '<zen> or <user> <username> or <issues> <user> <repo> or <repo> <user> <repo-name>',
	args: true,
	async execute(message, args) {
		if (args[0] == 'zen') {
		    const { body } = await snekfetch.get('https://api.github.com/zen');
			message.channel.send(`GitHub Zen Principle: ${body}`);
		}
		else if (args[0] == 'user') {
			if (args.length != 2) {
				return message.reply('You need to mention a user!');
			}
			const { body } = await snekfetch.get(`https://api.github.com/users/${args[1]}`);
			message.channel.send(`${args[1]}'s Bio: ${body.bio} \n${args[1]}'s GitHub: ${body.html_url}`);
		}
		else if (args[0] == 'issues') {
			if (args.length != 3) {
				return message.reply('You need to mention a user and repo!');
			}
			const { body } = await snekfetch.get(`https://api.github.com/repos/${args[1]}/${args[2]}/issues`);
			message.channel.send(`Issues for ${args[2]}: \n`);
			for (var i = 0; i < body.length; i++) {
				message.channel.send(`Issue ${i+1}: ${body[i].title} - ${body[i].body}`);
			}
		}
		else if (args[0] == 'repo') {
			if (args.length == 2) {
				const { body } = await snekfetch.get(`https://api.github.com/users/${args[1]}/repos`);
				if (body.length > 3) {
					for (var i = 0; i < 3; i++) {
						message.channel.send(`Repo ${i+1}: ${body[i].html_url}`);
					}
					message.channel.send(`More available at: ${body[i].owner.html_url}`);
				}
				else {
					for (var i = 0; i < body.length; i++) {
						message.channel.send(`Repo ${i+1}: ${body[i].html_url}`);
					}
				}
			}
			else if (args.length == 3) {
				const { body } = await snekfetch.get(`https://api.github.com/repos/${args[1]}/${args[2]}`);
				message.channel.send(`Link to ${args[2]}: ${body.html_url}`)
			}
			else {
				message.channel.send(`Woops`);
			}
			
		}
	},
};