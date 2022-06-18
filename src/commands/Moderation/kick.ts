import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import Guild from '../../models/Guild';


export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'kick',
        description: 'kick a member',
        requiredClientPermissions: ['KICK_MEMBERS'],
        requiredUserPermissions: ['KICK_MEMBERS'],
        
      });
  }
  public async messageRun(message: Message, args: Args) {
      let member = await args.pick('member');
      let reason = await args.rest('string').catch(() => 'N/A')
      let r =  message.member?.roles.highest.position as Number
      if(member.roles.highest.position >= r ?? message.author.id !== message.guild?.ownerId) return;
      if(member.id === message.author.id) return;
      if(member.id === this.container.client.user?.id) return;
      if(member.kickable) {
        let guild = await Guild.findOne({ guild: message.guild.id })
        if (guild) {
       await guild.updateOne({
                      $push: {
                          moderations: {
                              kick: {
                                  user: member.id,
                                  mod: message.author.id,
                                  reason: reason,
                                  case_id: guild.moderations.length,
                                  action: 'Kick'
                              }
                          }
                      }
                  })
                }
     await member.kick(`${reason}\n${message.author.username}(${message.author.id})`)
     message.channel.send(`<a:checkMark:975088677581639805> | Banned **${member.user.tag}** for ${reason} [\`#${guild.moderations.length}\`]`)
    let ch = message.guild.channels.cache.get(`${guild.log.channel}`) as TextChannel;
    if(ch) {
        let e =new MessageEmbed()
        .setColor('BLUE')
        .setAuthor({ name:`${message.author.tag}`, iconURL:`${message.author.avatarURL({ format: 'gif', dynamic: true})}`})
        .setDescription(`› **Action**: Kick\n› **User**: ${member.user.tag}(${member.user.id})\n› **Reason**: ${reason}`)
        .setFooter({ text:`Case #${guild.moderations.length}`, iconURL:`${this.container.client.user?.avatarURL()}`})
        .setTimestamp()
        await ch.send({ embeds:[e]})
    }
    }
  }
}