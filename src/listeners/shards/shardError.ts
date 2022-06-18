import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { red } from 'colorette';

export class UserEvent extends Listener<typeof Events.ShardError> {
	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			event: Events.ShardError
		});
	}

	public async run(error: Error, shardId: number) {
		this.container.logger.debug(`[${red(shardId)}] shard error: ${error.message}`);
		
	}

	public onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}