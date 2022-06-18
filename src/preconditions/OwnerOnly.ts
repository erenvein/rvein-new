import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

const OWNERS = ['412254835849691146' ,'409757314367750146'];

export class UserPrecondition extends Precondition {
	public async messageRun(message: Message) {
		return OWNERS.includes(message.author.id) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}