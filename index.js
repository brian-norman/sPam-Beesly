const fs = require('fs');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
require('dotenv').config();
const express = require('express');
var app = express();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	else {
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		// Set guildOnly to true if you don't want this command to work in DMs
		if (command.guildOnly && message.channel.type !== 'text') {
	    	return message.reply('I can\'t execute that command inside DMs!');
		}

		// Set args to true in the command.js if you want this check to run
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}
		try {
	    	command.execute(message, args);
		}
		catch (error) {
	    	console.error(error);
	    	message.reply('There was an error trying to execute that command!');
		}
	}
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});

// To wake up heroku every 5 minutes
var http = require("http");
setInterval(function() {
    http.get("http://spam-beesly.herokuapp.com");
}, 300000); // every 5 minutes (300000)
