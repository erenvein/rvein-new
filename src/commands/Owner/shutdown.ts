import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'shutdown',
	quotes: [],
	preconditions: ['OwnerOnly'],
})
export class SubCommand extends Command {
    public async messageRun(message: Message) {
        await this.container.client.destroy()
        return message.channel.send('shutdowning')
    }
}