import { Args, Command, RegisterBehavior } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { eightball } from '../../lib/utils';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: '8ball',
        description: 'ask something to get REAL answer of the question. (It includes magic)',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let args1 = await args.rest('string')
    if (args1 == "am i gay") return message.channel.send(":flushed: :rainbow_flag:")  
    message.channel.send(eightball())

  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let args1 = await interaction.options.getString('question')
  if (args1 == "am i gay") return await interaction.reply(":flushed: :rainbow_flag:")  
  await interaction.reply(eightball())

}

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
      .setName('8ball')
      .setDescription(this.description)
      .addStringOption(a => a.setName('question').setDescription('the question').setRequired(true))
  
    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
    }

    public registerChatInputCommand(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
      .setName('8ball')
      .setDescription(this.description)
      .addStringOption(a => a.setName('question').setDescription('the question').setRequired(true))
  
    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
    }
}