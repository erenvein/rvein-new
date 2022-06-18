import { emojify } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';


export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'emoji',
        description: 'makes your text emoji.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.rest('string')
      let a = emojify(sa)
      message.channel.send(a)
  }
}