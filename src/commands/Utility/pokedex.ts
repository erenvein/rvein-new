import fetch from 'node-fetch';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
//import DIG from 'discord-image-generation';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'pokedex',
        aliases: ['pokedéx'],
        description: 'search a pokemon in pokedex.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let pokemon = await args.rest('string')
    const r = await fetch(`https://some-random-api.ml/pokedex?pokemon=${pokemon}`)
    let res = await r.json()
      let name = `${res.name} #${res.id}`
      const embed = new MessageEmbed()
      .setColor(COLORS.white)
      .setAuthor({name: name, iconURL: res.sprites.animated})
      .setDescription(`${res.description}\n**HP**: ${res.stats.hp}\n**Attack**: ${res.stats.attack}\n**Defense**: ${res.stats.defense}\n\n**Generation**: ${res.generation}`)
      message.channel.send({ embeds:[embed]})
  }
  
}