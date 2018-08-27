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
	// Whenever a message is sent in a channel with sPam in it she logs the message
    // console.log(message.content);

    if (message.content === 'ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.');
}
});