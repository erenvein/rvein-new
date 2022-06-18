import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { getImageUrl } from '../../lib/utils';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'shibe',
        aliases: [],
        description: 'Generates a shibe image.',
      });
  }
  public async messageRun(message: Message) {
    const urls = await fetch<[string]>('https://shibe.online/api/shibes?count=1', FetchResultTypes.JSON);
    let embed = new MessageEmbed()
    .setImage(getImageUrl(urls[0]) ?? 'https://imgur.com/gallery/qDPRG.jpg')
    .setAuthor({ name: `${this.container.client.user?.username}`, iconURL: `${this.container.client.user?.avatarURL()}`})
    .setColor(COLORS.white)
    message.channel.send({ embeds: [embed] })
  }
}