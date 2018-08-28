module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        if (args[0] === 'pong') {
			message.channel.send('Wow you already said pong for me!')
		}
		else {
			message.channel.send('Pong.');
		}
    },
};