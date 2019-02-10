const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const Util = {
    CONSTANTS : {
        COLORS : {
            BAN: 16718080,
            UNBAN: 8450847,
            SOFTBAN: 16745216,
            KICK: 16745216,
            MUTE: 16763904,
            EMBED: 16776960,
            EMOJI: 16776960,
            REACTION: 16776960,
            WARN: 16776960
        }
    },

    logEmbed : ({message, member, duration, caseNum, action, reason}) => {

        const embed = new MessageEmbed().setTimestamp().setFooter('Case ' + caseNum)
        if (message) embed.setAuthor(`${message.member.user.tag} (${message.member.user.id})`, message.member.user.displayAvatarURL())
        .setDescription(`**Member:** ${member.user.tag} (${member.id})` + '\n' +
        `**Action:** ${action}${action === 'Mute' && duration ? `\n**Length:** ${ms(duration, { long: true })}` : ''}` + '\n' +
        `**Reason:** ${reason}`)
        return embed;
    },

    historyEmbed : ({ message, member, client }) => {

        const key = message.guild.id + member.user.id;
        const kick = client.settings.get(key, 'Kick', 0);
        const mute = client.settings.get(key, 'Mute', 0);
        const ban = client.settings.get(key, 'Ban', 0);
        const warn = client.settings.get(key, 'Warn', 0);
        const restriction = client.settings.get(key, 'Restriction', 0);

        return new MessageEmbed()
        .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
        .setFooter(`${warn} warning${warn > 1 || warn === 0 ? 's' : ''}, ` +
        `${restriction} restriction${restriction > 1 || restriction === 0 ? 's' : ''}, ` +
        `${mute} mute${mute > 1 || mute === 0 ? 's' : ''}, ` +
        `${kick} kick${kick > 1 || kick === 0 ? 's' : ''}, ` +
        `and ${ban} ban${ban > 1 || ban === 0 ? 's' : ''}`);
    }
};
module.exports = Util;