//import { sendLoadingMessage } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'discrim',
        aliases: [''],
        description: 'do a discrim.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let bb = await args.pick('string').catch(() => message.member?.user.discriminator)
      let sa = this.container.client.users.cache.filter(a => a.discriminator ==bb).map(a => a.username +"#"+ a.discriminator).join('\n')
      let e = new MessageEmbed()
      .setColor(COLORS.white)
      .setDescription(`${sa || "Not found!"}`)
      message.channel.send({ embeds:[e] })
    };
  
}