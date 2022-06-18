import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'dog',
        description: 'Generates a dog image.',
      });
  }
  public async messageRun(message: Message) {
    const r = await fetch('https://some-random-api.ml/animal/dog');
    let e = await r.json()
    let embed = new MessageEmbed()
    .setImage(e.image)
    .setAuthor({ name: `${this.container.client.user?.username}`, iconURL: `${this.container.client.user?.avatarURL()}`})
    .setColor(COLORS.white)
    .setDescription(e.fact)
    message.channel.send({ embeds: [embed] })
  }
}