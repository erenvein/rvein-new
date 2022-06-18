import { Args, Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
import model from '../../models/Guild'

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'log',
        description: 'sets log for server',
        requiredUserPermissions: ['MANAGE_GUILD']
      });
  }
  public async messageRun(message: Message, args: Args) {
      let prefixx = await args.pick('channel')
    
      const guild = await model.findOne({ guild: message.guild?.id });
      
      if (guild) {
			await guild.updateOne({
                'log.channel': prefixx.id
            })
    }
		else {
			new model({
                guild: message.guild?.id,
                'log.channel': prefixx.id
            }).save()
    }
       return await sendLocalized(message, { keys: 'log:success', formatOptions: { channel: `${prefixx}` } });
  }
}