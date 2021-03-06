const { Command } = require('discord-akairo');

class ToggleModerationCommand extends Command {
	constructor() {
		super('toggle-moderation', {
			aliases: ['moderation'],
			category: 'config',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			description: { content: 'Toggle moderation features on the server.' }
		});
	}

	async exec(message) {
		const moderation = this.client.settings.get(message.guild, 'moderation', undefined);
		if (moderation) {
			this.client.settings.set(message.guild, 'moderation', false);
			return message.util.reply('disabled moderation commands!');
		}
		this.client.settings.set(message.guild, 'moderation', true);

		return message.util.reply('activated moderation commands!');
	}
}

module.exports = ToggleModerationCommand;
