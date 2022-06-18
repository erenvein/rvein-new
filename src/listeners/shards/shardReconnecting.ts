import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { yellow } from 'colorette';

export class UserEvent extends Listener<typeof Events.ShardReconnecting> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			event: Events.ShardReconnecting
		});
	}

	public async run(shardId: number) {
		this.container.logger.debug(`[${yellow(shardId)}] shard reconnecting.`);
	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}