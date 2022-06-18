import { Command, RegisterBehavior } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import type { Message } from 'discord.js';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'ping',
        description: 'Checks the bot ping.',
      });
  }
  public async messageRun(message: Message) {
    const msg = await message.channel.send('Ping?');
    const content = `Pong!🏓 ${Math.round(this.container.client.ws.ping)}ms. API ${
      msg.createdTimestamp - message.createdTimestamp
    }ms.`;
    return msg.edit(content);
  }
  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const msg = await interaction.reply({ content: `Ping?`, fetchReply: true });
    if (isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply(`Pong!🏓 Round trip took: ${diff}ms. Heartbeat: ${ping}ms.`);
    }
    return interaction.editReply('Failed to retrieve ping :(');
  }
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('ping')
        .setDescription('Shows the bot latency.')
    ),
    { idHints: ['979475267187789846'], behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
  public registerChatInputCommand(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('ping')
        .setDescription('Shows the bot latency.')
    ),
    { idHints: '979475267187789846', behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
}