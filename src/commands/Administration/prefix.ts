import { Args, Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
import model from '../../models/Guild'

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'prefix',
        description: 'sets prefix for server',
        requiredUserPermissions: ['MANAGE_GUILD']
      });
  }
  public async messageRun(message: Message, args: Args) {
      let prefixx = await args.pick('string')
      if(prefixx.length > 7)  return await sendLocalized(message, { keys: 'prefix:seven'});
      const guild = await model.findOne({ guild: message.guild?.id});
      
      if (guild) {
			await guild.updateOne({ prefix: prefixx})
    }
		else {
			await new model({
        guild: message.guild?.id,
        prefix: prefixx
      }).save()
    }
       return await sendLocalized(message, { keys: 'prefix:success', formatOptions: { prefixarg: prefixx } });
  }
}