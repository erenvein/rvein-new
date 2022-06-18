//import { sendLoadingMessage } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'quotes',
        aliases: ['animequotes', 'quote'],
        description: 'Generates a random anime quote.',
      });
  }
  public async messageRun(message: Message) {
    const { randomQuote } = require('aniquotes-npm')
    const { searchAnime } = require('node-kitsu');
    const { quote, anime, name } = randomQuote();

    const res = await searchAnime(anime,0).catch(()=>{}) || [];

    const image = res?.[0]?.attributes?.coverImage?.original || null;

    let d = new MessageEmbed()
    .setColor(COLORS.white)
    .addField(`Quoted from ${anime}*`,`${quote}\n-${name}`)
    .setImage(image)
    .setTimestamp()
    return message.channel.send({ embeds:[d]})
     
  }
  
}