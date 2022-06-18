import { Args, Command } from '@sapphire/framework';
import { Message, MessageAttachment } from 'discord.js';
import DIG from 'discord-image-generation';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'lisa',
        aliases: ['lisa-presentation', 'lisapresentation'],
        description: 'makes someone avatar not stonks.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.rest('string')
      let img = await new DIG.LisaPresentation().getImage(`${sa}`)
  let attach = new MessageAttachment(img, "blur.png");;
  message.channel.send({ files: [attach]})
  }
}