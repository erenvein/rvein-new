//import { sendLoadingMessage } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
import MFA from 'mangadex-full-api';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'manga',
        aliases: ['manga-info', 'mangainfo'],
        description: 'Search a manga.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      const srch = await args.rest('string')
      let a: string[] = []
      let manga = await MFA.Manga.getByQuery(srch);

    MFA.login('evils', 'eren1234').then(() => {
        MFA.Manga.search({
            title: srch,
            limit: Infinity
        }).then(async results => {
            results.forEach((elem, i) => a.push(`[${i + 1}] ${elem.title}`))
            let d = new MessageEmbed()
            .setColor(COLORS.white)
            .setDescription(`${manga.localizedDescription.localString}`)
            message.channel.send({ embeds:[d], content:`There are ${a.length} results found for ${srch}`})
        })
    }).catch();
  }
  
}