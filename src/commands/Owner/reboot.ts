import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'reboot',
	quotes: [],
	preconditions: ['OwnerOnly'],
})
export class SubCommand extends Command {
    public async messageRun(message: Message) {
        await process.exit()
        return message.channel.send('rebooting')
    }
}