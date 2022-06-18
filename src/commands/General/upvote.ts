import { Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'upvote',
        description: 'Shows the upvote link for rvein.',
      });
  }
  public async messageRun(message: Message) {
    return sendLocalized(message, { keys:'upvote:success', formatOptions: { id: this.container.client.id}})
  }
}