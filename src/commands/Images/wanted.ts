import { Args, Command } from '@sapphire/framework';
import { Message, MessageAttachment } from 'discord.js';
import DIG from 'discord-image-generation';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'wanted',
        description: 'makes someone avatar one piece wanted to spefic currency.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.pick('user')
      let slm = await args.rest('number')
      let avatar = sa.avatarURL({ dynamic: false, format:'png'})

      let img = await new DIG.Wanted().getImage(`${avatar}`, `${slm}`)
  let attach = new MessageAttachment(img, "blur.png");;
  message.channel.send({ files: [attach]})
  }
}