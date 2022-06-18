//import { sendLoadingMessage } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'roles',
        aliases: ['server-roles'],
        description: 'Shows server roles.',
      });
  }
  public async messageRun(message: Message) {
    let r = message.guild?.roles.cache
    .filter((r) => r.id !== message.guild?.id)
    .sort((a, b) => b.position - a.position)
    .map((r) => `<@&${r.id}>`)
    .join('\n');

    const embed = new MessageEmbed()
    .setColor(COLORS.white)
    .setAuthor({ name:`${message.guild?.name}`, iconURL:`${message.guild?.iconURL()}`})
    .addField('Server Roles', `${r}`)
    .setThumbnail(`${message.guild?.iconURL()}`)
    message.channel.send({ embeds:[embed]})
    };
  
}