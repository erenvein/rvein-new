//import { sendLoadingMessage } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'emotes',
        aliases: ['server-emotes'],
        description: 'Shows server emotes.',
      });
  }
  public async messageRun(message: Message) {
    let r = message.guild?.emojis.cache.map((e) => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`).join(' ');

    const embed = new MessageEmbed()
    .setColor(COLORS.white)
    .setAuthor({ name:`${message.guild?.name}`, iconURL:`${message.guild?.iconURL()}`})
    .setDescription(`${r}`)
    .setThumbnail(`${message.guild?.iconURL()}`)
    message.channel.send({ embeds:[embed]})
    };
  
}