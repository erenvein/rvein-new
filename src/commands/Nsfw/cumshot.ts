import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'cumshot',
        nsfw: true,
        aliases:['cumshots'],
        description: 'No description provided.',
      });
  }
  public async messageRun(message: Message) {
    const { RandomPHUB } = require('discord-phub');
    const nsfw = new RandomPHUB();
    const pussy = nsfw.getRandomInCategory('cumshots', "gif");
    const d = new MessageEmbed()
    .setColor(COLORS.white)
    .setTitle('Cum shots')
    .setImage(pussy.url)
    message.channel.send({ embeds:[d]})
  }
}