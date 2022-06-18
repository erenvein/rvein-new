import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { red } from 'colorette';
import type { CloseEvent } from 'discord.js';

export class UserEvent extends Listener<typeof Events.ShardDisconnect> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			event: Events.ShardDisconnect
		});
	}

	public async run(event: CloseEvent, shardId: number) {
		this.container.logger.debug(`[${red(shardId)}] ${red('shard disconnected: '+event.reason)}`);
	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}