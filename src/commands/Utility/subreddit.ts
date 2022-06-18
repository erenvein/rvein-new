//import { sendLoadingMessage } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'subreddit',
        nsfw: true,
        aliases: ['reddit'],
        description: 'Searches a subreddit.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      const a = await args.rest('string');
      const r = await fetch(`https://reddit.com/r/${a}/about/.json`);
      let res = await r.json()
      const em = new MessageEmbed()
      .setColor(COLORS.white)
      .setDescription(`${res.data.community_icon.split("?")[0] ? `[Icon](${res.data.community_icon.split("?")[0]})` : "[Icon](Icon)"} **|** ${res.data.banner_background_image.split("?")[0] ? `[Banner](${res.data.banner_background_image.split("?")[0]})` : "[Banner](Banner)"}`)
      .addField("Public Description", res.data.public_description || "None")
      .setTitle(res.data.display_name_prefixed)
      .addField("Created at", `<t:${res.data.created}:R>`)
      .setThumbnail(res.data.community_icon.split("?")[0] || "")
      .setImage(res.data.banner_background_image.split("?")[0] || "")
      message.channel.send({ embeds:[em]})
    };
  
}