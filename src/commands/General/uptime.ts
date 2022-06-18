import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'uptime',
        description: 'Shows the uptime of rvein.',
      });
  }
  public async messageRun(message: Message) {
    message.channel.send(`Uptime:\n${humanize(Number(this.container.client.uptime))}`) 
  }
  }
