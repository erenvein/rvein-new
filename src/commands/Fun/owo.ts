import owoify from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';


export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'owo',
        description: 'makes your text owo!',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.rest('string')
      let ss = await owoify(sa)
    message.channel.send(ss)
  }
}