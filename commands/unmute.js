const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  if (message.channel.type == 'dm') {
    return message.channel.send("This is Not a right place to use this Command!");
  };

  if (message.guild.id !== '500004711005683717') return message.channel.send(`This command works for **Air Hounds - Discord Server** Only <:right:509629414120882176>` + `\n` + `https://discord.gg/8RTMVFW`);

  if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036')  && !message.member.roles.get('500683658009640975') && !message.member.roles.get('513284645274517504')) {
    //message.delete(4000)
    return message.channel.send(`Only <@&500683949018710036> / <@&500683658009640975> / <@&513284645274517504> can use this Command!`).then(msg => {msg.delete(4000)});
  }

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);

  if (!member) 
  return message.channel.send(`Please mention a valid member of this Server! <:wrong:523020135737458689>`).then(msg => {msg.delete(4000)});

  if (member == message.guild.members.get(message.author.id)) 
  return message.channel.send(`I am not sure why you are using this command! are you <@&505324342679437322>?`) // muted
  
  if (member == message.guild.members.get(client.user.id)) 
  return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not muteable!!!** <:huh:523021014481764352>")

  if (!member.roles.has('505324342679437322'))
  return message.channel.send('User is not <@&505324342679437322>!'); //muted

  let reason = args.slice(1).join(' ');
  if (!reason) {
    reason = "Not Provided";
  };

  let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

  let muteRole = message.guild.roles.find(r => r.name === 'Muted');

  const embed = new Discord.RichEmbed()
  .setTitle(`${member.user.tag} | ${member.user.id}`)
  .setColor('#08f885')
  .setTimestamp()
  .addField(`\`MOD: ${message.author.tag}\``, `\`REASON: ${reason}\``)
  .setFooter(`UNMUTED`, member.user.displayAvatarURL)

  member.removeRole(muteRole).then(() => {

    client.channels.get(mod_log_channel.id).send({embed});
    message.channel.send("Done. User has been Unmuted <a:hype:515571561345056783>")
    .catch(error => message.channel.send(`I could not unmute this user! \n ${error}`));

  });

}