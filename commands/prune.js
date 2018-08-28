module.exports = {
	name: 'prune',
	description: 'Removed the last x number of messages in channel',
	args: true,
	execute(message, args) {
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
}