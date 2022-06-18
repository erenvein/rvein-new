import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'bunny',
        aliases: ['rabbit'],
        description: 'Generates a bunny image.',
      });
  }
  public async messageRun(message: Message) {
    const r = await fetch('https://api.bunnies.io/v2/loop/random/?media=gif,png');
    let e = await r.json()
    let embed = new MessageEmbed()
    .setImage(e.gif)
    .setAuthor({ name: `${this.container.client.user?.username}`, iconURL: `${this.container.client.user?.avatarURL()}`})
    .setColor(COLORS.white)
    message.channel.send({ embeds: [embed] })
  }
}