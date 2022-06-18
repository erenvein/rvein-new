import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';


export class UserPrecondition extends Precondition {
	public async messageRun(message: Message) {
        let owner = message.guild?.ownerId
		return owner?.includes(message.author.id) ? this.ok() : this.error({ message: 'This command can only be used by the guild owner.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		GuildOwner: never;
	}
}