const { prefix } = require('./config.json');

// require the discord.js module
const Discord = require('discord.js');

require('dotenv').config();


// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting

client.on('ready', () => {
    console.log('Ready!');
});

// login to Discord with your app's token
client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.content.startsWith(`${prefix}ping`)) {
    	message.channel.send('Pong.');
	}
	else if (message.content.startsWith(`${prefix}beep`)) {
	    message.channel.send('Boop.');
	}
	else if (message.content.startsWith(`${prefix}server`)) {
		message.channel.send(`This server's name is: ${message.guild.name} 
			\n Total members: ${message.guild.memberCount}
			\n This server was created at: ${message.guild.createdAt}`);
	}
	else if (message.content.startsWith(`${prefix}user-info`)) {
		message.channel.send(`Your username: ${message.author.username}`);
	}

});