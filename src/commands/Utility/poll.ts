//import { sendLoadingMessage } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'poll',
        aliases: ['pool'],
        requiredUserPermissions:['MANAGE_MESSAGES'],
        description: 'Make a pool.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let e = await args.rest('string');
      let embed = new MessageEmbed()
      .setDescription(`[${message.author.tag}]:\n${e}`)
      .setColor(COLORS.white)
    const msg = await message.channel.send({ embeds:[embed]})
    await msg.react("975088677581639805")
    await msg.react("975088845093740625")
  }
  
}