//import { sendLoadingMessage } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { toRgb, toHsl, isLight } from "@wessberg/color";

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'randomcolor',
        aliases: ['randomhex'],
        description: 'Generates a random color.',
      });
  }
  public async messageRun(message: Message) {
    let r = require('random-hex-color')
    let rc = r()
    let is = isLight(rc)
    let c = new MessageEmbed()
    .setColor(rc)
    .addField('Hex', rc)
    .addField('RGB', toRgb(`${rc}`))
    .addField('HSL', toHsl(`${rc}`))
    .addField('Is light?', is.toString())
    await message.channel.send({ embeds:[c]})
  }
  
}