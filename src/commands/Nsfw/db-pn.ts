import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'double-pn',
        nsfw: true,
        aliases:['double-penetration'],
        description: 'No description provided.',
      });
  }
  public async messageRun(message: Message) {
    const { RandomPHUB } = require('discord-phub');
    const nsfw = new RandomPHUB();
    const pussy = nsfw.getRandomInCategory('double-penetration', "gif");
    const d = new MessageEmbed()
    .setColor(COLORS.white)
    .setTitle('Double Penetration')
    .setImage(pussy.url)
    message.channel.send({ embeds:[d]})
  }
}