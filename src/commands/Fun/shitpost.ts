import { pickRandom } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import fetch from 'node-fetch';
import { COLORS } from '../../config';
import { sendLocalized } from '@sapphire/plugin-i18next';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'shitpost',
        description: 'send a shitpost from random subreddits.',
      });
  }
  public async messageRun(message: Message) {
      let subArray = ['norules', 'okbuddyretard', 'greentext', 'blursedimages', 'ihadastroke']
      let subreddit = pickRandom(subArray)
      let s = await fetch(`http://meme-api.herokuapp.com/gimme/${subreddit}`)
      let a = await s.json()
      let aaa = message.channel as TextChannel
      if(a.nsfw === true) {
          if(aaa.nsfw === true) {
            let e = new MessageEmbed()
            .setColor(COLORS.white)
            .setTitle(a.title)
            .setImage(a.url)
            .setFooter({ text:`${message.author.tag} | 👍 ${a.ups} | r/${subreddit}`})
          message.channel.send({ embeds:[e]})
          } else {
            return await sendLocalized(message, { keys:'meme:nsfw'})
          }
      }
      let e = new MessageEmbed()
      .setColor(COLORS.white)
      .setTitle(a.title)
      .setImage(a.url)
      .setFooter({ text:`${message.author.tag} | 👍 ${a.ups} | r/${subreddit}`})
    message.channel.send({ embeds:[e]})
  }
}