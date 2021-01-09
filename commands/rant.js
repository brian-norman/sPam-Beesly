/**
 * Gets the nickname for given userid in the given guild, if fails, gives them their username instead.
 *
 * @param user_id - String containing the unique Discord ID of user to get the name of
 * @returns String containing user's nickname in the given Guild, or their username if none found
 */
function getName(client, guild, user_id) {
	if (guild.members.get(user_id) == undefined) {return client.users.get(user_id).username;}
	if (guild.members.get(user_id).nickname != null) {return guild.members.get(user_id).nickname;}
	return client.users.get(user_id).username;
}

module.exports = {
	name: 'rant',
	description: 'Remove the last x number of messages in channel and repost them in #rants',
	args: true,
	guildOnly: true,
	usage: '<number of messages to move>',
	execute(message, args, client) {
		const RANT_CHANNEL_ID = '797475055516254229';
		const GUILD_ID = '481569847977705472';

		const rantChannel = client.channels.get(RANT_CHANNEL_ID);
		const guild = client.guilds.get(GUILD_ID);

		const printMessages = (messages) => {
			// TODO: sort messages by createdTimestamp

			messages.forEach(retrievedMsg => {
				rantChannel.send('_ _', { 'embed': {
					'author': {
						'name': getName(client, guild, retrievedMsg.author.id),
						'icon_url': retrievedMsg.author.avatarURL,
					},
					'timestamp': retrievedMsg.createdTimestamp,
					'fields': [
						{
							'name': 'Rant:',
							'value': retrievedMsg.content,
						},
					] },
				});
			});
		};

		// TODO: Don't forget this +1
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number!');
		}
		else if (amount < 1 || amount > 100) {
			return message.reply('You need to input a number between 2 and 100.');
		}

		message.channel.fetchMessages({ limit: amount })
			.then(messages => printMessages(messages))
			.catch(console.error);

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			if (err.message === 'Missing Permissions') {
				message.reply('I don\'t have permission to do that in here!');
			}
			else {
				message.reply('There was an error trying to prune messages in this channel!');
			}
		});
	},
};