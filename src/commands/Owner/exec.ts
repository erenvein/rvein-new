import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import execc from 'util'

@ApplyOptions<CommandOptions>({
	description: 'exec',
	quotes: [],
	preconditions: ['OwnerOnly'],
})
export class SubCommand extends Command {
  
  public async messageRun(message: Message, args: Args) {
      let proc = await args.rest('string')
    const exec = execc.promisify(require('child_process').exec)
    exec(proc)
        .then(({ stdout, stderr }: any) => {
        return message.channel.send(stderr.substring(0, 200) || stdout.substring(0, 200))
      })
          .catch((err: any) => {
        return message.channel.send(err)
      })
  }
}