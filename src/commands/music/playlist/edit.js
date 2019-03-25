const { Command } = require('discord-akairo');
const Playlist = require('../../../models/Playlist');
const { Util } = require('discord.js');

class PlaylistEditCommand extends Command {
	constructor() {
		super('playlist-edit', {
			category: 'music',
			description: {
				content: 'Edits the description of a playlist.',
				usage: '<playlist> <info>'
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					type: 'playlist',
					prompt: {
						start: `what playlists description do you want to edit?`,
						retry: (msg, args, { phrase }) => `a playlist with the name **${phrase}** does not exist.`
					}
				},
				{
					id: 'info',
					match: 'rest',
					type: 'string',
					prompt: {
						start: `what should the new description be?`
					}
				}
			]
		});
	}

	async exec(message, { playlist, info }) {
		if (playlist.userID !== message.author.id) return message.util.reply('you can only edit your own playlists.');
		await playlist.update({ description: Util.cleanContent(info, message) });

		return message.util.reply(`successfully updated **${playlist.name}s** description.`);
	}
}

module.exports = PlaylistEditCommand