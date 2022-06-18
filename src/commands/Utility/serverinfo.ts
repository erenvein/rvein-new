//import { sendLoadingMessage } from '../../lib/utils';
import { Command } from '@sapphire/framework';
import { roundNumber } from '@sapphire/utilities';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'serverinfo',
        aliases: [''],
        description: 'shows the server info.',
      });
  }
  public async messageRun(message: Message) {
    let ss = Number(message.guild?.createdTimestamp) / 1000;
    let s = roundNumber(ss)
   let embed = new MessageEmbed()
   .setColor(COLORS.white)
   .setDescription(`**Owner** <@${message.guild?.ownerId}>\n**Verification** ${message.guild?.verificationLevel.replace("NONE", "None").replace("LOW", "Low").replace("MEDIUM", "Medium").replace("VERY_HIGH", "Very High").replace("HIGH", "High")}`)
   .setAuthor({ name: `${message.guild?.name}`, iconURL:`${message.guild?.iconURL()}`})
   .setThumbnail(`${message.guild?.iconURL( { dynamic: true })}`)
   .addField(`Created at`,`<t:${s}:R>`)
   .addField(`Members`, `${message.guild?.members.cache.filter(m => m.presence?.status == "online").size} <a:online:744593586905022474> ${message.guild?.members.cache.filter(m => m.presence?.status == "dnd").size} <a:dnd:744576094132371552> ${message.guild?.members.cache.filter(m => m.presence?.status == "idle").size} <a:idle:744593784993742858> ${message.guild?.members.cache.filter(m => m.presence?.status == "offline").size} <a:offline:744593678319747083>\n**Total** ${message.guild?.members.cache.size}\n**Humans** ${message.guild?.members.cache.filter(m => !m.user.bot).size}\n**Bots** ${message.guild?.members.cache.filter(m => m.user.bot).size}`)
   //.addField(`Channels`, `**Total** ${message.guild.channels.cache.size}\n**Text** ${message.guild.channels.cache.filter(c => c.type == "text").size}\n**Voice** ${message.guild?.channels.cache.filter(c => c.?type == "voice").size}\n**News** ${message.guild.channels.cache.filter(c => c.type == "news").size}\n**Category** ${message.guild.channels.cache.filter(c => c.type == "category").size}`)
   .addField(`Server links`, `${message.guild?.iconURL() ? `[Server icon](${message.guild.iconURL({ dynamic: true, size: 2048 })})` : `[Server icon](${message.guild?.iconURL()})`}`)
   .setFooter({ text:`ID: ${message.guild?.id}`})//doarbey kereme nitro lol hü almş amk bune herkes alio bi bend yok
   message.channel.send({ embeds: [embed]})
    };
}