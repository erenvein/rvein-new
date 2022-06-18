import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import Guild from '../../models/Guild';


export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'unban',
        description: 'unban',
        requiredUserPermissions: ['BAN_MEMBERS']
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.pick('user')
      let reason = await args.rest('string').catch(() => 'N/A')
      let guild = await Guild.findOne({ guild: message.guild?.id })
      await message.guild?.bans.remove(sa.id, reason).then(user => message.channel.send(`<a:checkMark:975088677581639805> | Unbanned **${user?.tag}** for ${reason} [\`#${guild.moderations.length}\`]`))

      if (guild) {
     await guild.updateOne({
                    $push: {
                        moderations: {
                            kick: {
                                user: sa.id,
                                mod: message.author.id,
                                reason: reason,
                                case_id: guild.moderations.length,
                                action: 'Unban'
                            }
                        }
                    }
                })
              }
      let ch = message.guild?.channels.cache.get(`${guild.log.channel}`) as TextChannel;
    if(ch) {
        let e =new MessageEmbed()
        .setColor('ORANGE')
        .setAuthor({ name:`${message.author.tag}`, iconURL:`${message.author.avatarURL({ format: 'gif', dynamic: true})}`})
        .setDescription(`› **Action**: Unban\n› **User**: ${sa.tag}(${sa.id})\n› **Reason**: ${reason}`)
        .setFooter({ text:`Case #${guild.moderations.length}`, iconURL:`${this.container.client.user?.avatarURL()}`})
        .setTimestamp()
        await ch.send({ embeds:[e]})
    }
  }
}