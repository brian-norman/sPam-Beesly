const { prefix } = require('./config.json');
const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		if (args[0] === 'pong') {
			message.channel.send('Wow you already said pong for me!')
		}
		else {
			message.channel.send('Pong.');
		}
	}
	else if (command === 'kick') {
		if (!message.mentions.users.size) {
    		return message.reply('you need to tag a user in order to kick them!');
    	}
    	const taggedUser = message.mentions.users.first();
		message.channel.send(`You want to kick: ${taggedUser}`);
	}	
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
    		return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
    	}
    	const avatarList = message.mentions.users.map(user => {
        	return `${user.username}'s avatar: ${user.displayAvatarURL}`;
    	});

	    // send the entire array of strings as a message
	    // by default, discord.js will `.join()` the array with `\n`
	    message.channel.send(avatarList);
	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]);
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount < 2 || amount > 100) {
			return message.reply('you need to input a number between 2 and 100.');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
    		console.error(err);
    		if (err.message === 'Missing Permissions') {
    			message.reply(`I don't have permission to do that in here!`);
    		}
    		else {
	    		message.reply('There was an error trying to prune messages in this channel!');
    		}
		});	
	}	
});