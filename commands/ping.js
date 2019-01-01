
module.exports = {
    name: 'ping',
    type: 'Utils',
    aliases: ['ping status'],
	usage: '',
	description: 'API Latency or Ping Status',
    cooldown: 30,
    
	async execute(message, args, client) {
        const m = await message.channel.send("PING TEST");
        m.edit(`\`Latency ${m.createdTimestamp - message.createdTimestamp}ms\` <a:hype:515571561345056783> \`API Latency ${Math.round(client.ping)}ms\``);
    
	},
};
