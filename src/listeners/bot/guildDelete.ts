import { Listener } from '@sapphire/framework';
import { red, white } from 'colorette';
import type { Guild } from 'discord.js';

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: 'guildDelete'
    });
  }
  public async run(guild: Guild) {
    this.container.client.logger.info(`[${red}${guild.name}${white}]`)
  };
};
