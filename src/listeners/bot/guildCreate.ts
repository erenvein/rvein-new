import { Listener } from '@sapphire/framework';
import { white, yellow } from 'colorette';
import type { Guild } from 'discord.js';


export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: 'guildCreate'
    });
  }
  public async run(guild: Guild) {
    this.container.client.logger.info(`[${yellow}${guild.name}${white}]`)

  };
};
