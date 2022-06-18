import { Args, Command } from '@sapphire/framework';
import { Message, MessageAttachment } from 'discord.js';
import DIG from 'discord-image-generation';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'bobross',
        description: 'makes you bobross',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let sa = await args.pick('user').catch(() => message.author);
      let avatar = sa.avatarURL({ dynamic: false, format:'png'})

      let img = await new DIG.Bobross().getImage(`${avatar}`)
   let attach = new MessageAttachment(img, "bobross.png");;
  message.channel.send({ files: [attach]})
  }
}