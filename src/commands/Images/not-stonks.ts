import { Args, Command } from '@sapphire/framework';
import { Message, MessageAttachment } from 'discord.js';
import DIG from 'discord-image-generation';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'notstonks',
        aliases: ['not-stonks'],
        description: 'makes someone avatar not stonks.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.pick('user').catch(() => message.author);
      let avatar = sa.avatarURL({ dynamic: false, format:'png'})

      let img = await new DIG.NotStonk().getImage(`${avatar}`)
  let attach = new MessageAttachment(img, "blur.png");;
  message.channel.send({ files: [attach]})
  }
}