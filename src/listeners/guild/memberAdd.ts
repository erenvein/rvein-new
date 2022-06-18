import { Listener } from '@sapphire/framework';
import { roundNumber } from '@sapphire/utilities';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { COLORS } from '../../config';
import Guild from '../../models/Guild';

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: 'guildMemberAdd'
    });
  }
  public async run(member: GuildMember) {
    if(!member.guild.me?.permissions.has('MANAGE_ROLES')) return;
    const data = await Guild.findOne({ guild: member.guild?.id})

    if(data.autoroles?.role) {
      let sa = await member.guild.roles.cache.get(data.autoroles.role)
      if(!sa) return;
     member.roles.add(data.autoroles.role)
    }

    if(data.autoroles?.bot) {
      if(member.user.bot === true) {
        let sa = await member.guild.roles.cache.get(data.autoroles.bot)
        if(!sa) return;
      member.roles.add(data.autoroles.bot)
      }
     }

    let channel = this.container.client.channels.cache.get(`${data?.welcome.channel}`) as TextChannel;
    let created1 = Number(member.user.createdTimestamp) / 1000;

    let created = roundNumber(created1)
    if (channel && data?.message) {
      let channel = this.container.client.channels.cache.get(`${data?.welcome.channel}`) as TextChannel;
        channel.send(`${data.message.replaceAll('{member}', `<@${member.user.id}>`).replaceAll('{member.username}', member.user.username).replaceAll('{member.id}', member.user.id)}`)
        } 
   else if(channel) {
      let e = new MessageEmbed()
      .setAuthor({ name: `Member "${member.user.tag}" joined`, iconURL: member.user.avatarURL({dynamic: true}) || member.user.defaultAvatarURL})
      .setColor(COLORS.white)
      .setDescription(`**Member** ${member.user.tag}\n**Created** <t:${created}>`)
      .setThumbnail(member.user.avatarURL({dynamic:true}) || member.user.defaultAvatarURL)
      .setFooter({ text: `ID: ${member.id}`})
      .setTimestamp()
    channel.send({ embeds:[e]})
}

  };
};
