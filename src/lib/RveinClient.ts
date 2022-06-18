import { LogLevel, SapphireClient } from '@sapphire/framework';
import { TOKEN, PRESENCE, PREFIX, COOLDOWN_FILTERED } from '../config';
import type { Message } from 'discord.js';
import '@sapphire/plugin-i18next/register';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';
import './setup';
import 'dotenv/config'
import model from '../models/Guild';


export class RveinClient extends SapphireClient {
    constructor() {
        super({
            defaultPrefix: 'rvein ',
            intents: [
              'GUILDS',
              'GUILD_EMOJIS_AND_STICKERS',
              'GUILD_MESSAGES', 
              'GUILD_WEBHOOKS', 
              'GUILD_MEMBERS', 
              'GUILD_BANS', 
              'GUILD_SCHEDULED_EVENTS', 
              'GUILD_INTEGRATIONS', 
              'GUILD_WEBHOOKS',
              'GUILD_VOICE_STATES',
              
            ],
            shardCount: 2,
            caseInsensitiveCommands: true,
            defaultCooldown: {
                delay: 5_000,
                filteredUsers: COOLDOWN_FILTERED
            },
            presence: {
                activities: [ { name: PRESENCE.name}],
            },
            loadMessageCommandListeners: true,
            loadDefaultErrorListeners: false,
            logger: { level: LogLevel.Debug },
            i18n: {
                fetchLanguage: async (context: InternationalizationContext) => {
                    if (!context?.guild) return 'en-US';

                    const guild = await model.findOne({ guild: context.guild.id });
            
                    return guild?.language ?? 'en-US';
                }
              }
            
        })
    }
    async start() {         
        try {
            await this.login(TOKEN);
        } catch (error) {
            this.logger.fatal(error);
            this.destroy();
            process.exit(1);
        }
    };
	public fetchLanguage = async (context?: InternationalizationContext): Promise<string> => {
		if (!context?.guild) return 'en-US';

		const guild = await model.findOne({ guild: context.guild.id });

		return guild?.language ?? 'en-US';
	};
	public fetchPrefix = async (message: Message) => {
		if (!message.guild) return PREFIX;

		const guild = await model.findOne({ guild: message.guild.id })

		return guild?.prefix ?? PREFIX;
	};

}
