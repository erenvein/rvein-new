import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import os from 'os';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'stats',
        description: 'Shows the stats of rvein.',
      });
  }
  public async messageRun(message: Message) {
    //let usg = process.memoryUsage().heapUsed;
      const client = this.container.client;
    let e = new MessageEmbed()
    //.setDescription(`\`Guilds\` ${client.guilds.cache.size}\n\`Users\` ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
  .setColor(COLORS.white)
  .addField("Guilds | Users", `${client.guilds.cache.size} | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
  .addField("Uptime", require("humanize-duration")(client.uptime))
  //.addField("RAM", pr(usg) , true)
  .addField("Free Mem", `${process.memoryUsage().heapTotal / 1024 / 1024}}`)
  .addField("Ping", this.container.client.ws.ping+" ms")
  .addField(`Load AVG `, `${os.loadavg().map((annen) => annen.toFixed(2)).join(", ")}`)
   message.channel.send({ embeds:[e]})
  }
}