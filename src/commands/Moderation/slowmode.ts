import { Args, Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { sendLocalized } from '@sapphire/plugin-i18next';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'slowmode',
        description: 'makes your channel slowmode!',
        requiredUserPermissions: ['MANAGE_CHANNELS'],
    
      });
  }
  public async messageRun(message: Message, args: Args) {
      let amount = await args.pick('number')
      if(amount > 21600) return;
      if(amount === 21601) return;
      let channel = message.channel as TextChannel;
        channel.setRateLimitPerUser(Number(amount), `${message.author.username}`)
        return sendLocalized(message, { keys: 'slowmode:success', formatOptions: { amount}})
        }
}