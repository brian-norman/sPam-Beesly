module.exports = {
	name: 'kick',
	description: 'Kicks the first user tagged',
	args: true,
	usage: '<user>',
	execute(message, args) {
		if (!message.mentions.users.size) {
    		return message.reply('you need to tag a user in order to kick them!');
    	}
    	const taggedUser = message.mentions.users.first();
		message.channel.send(`You want to kick: ${taggedUser}`);
	}
}