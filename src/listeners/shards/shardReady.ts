import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { cyan } from 'colorette';

export class UserEvent extends Listener<typeof Events.ShardReady> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			event: Events.ShardReady
		});
	}

	public async run(shardId: number) {
		this.container.logger.debug(`[${cyan(shardId)}] shard launched.`);

	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}