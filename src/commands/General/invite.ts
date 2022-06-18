import { Command, RegisterBehavior } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import { Message, MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'invite',
        description: 'Add rvein to another servers.',
      });
  }
  public async messageRun(message: Message) {
    
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle('LINK')
        .setEmoji('📎')
            .setLabel(await resolveKey(message, 'invite:component'))
            .setURL('https://discord.com/api/oauth2/authorize?client_id=683366408092254275&permissions=8&scope=bot%20applications.commands'),
    );
    let d = new MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL:`${message.author.avatarURL()}`})
    .setTitle(await resolveKey(message, 'invite:component'))
    .setColor(COLORS.white)
    .setDescription(await resolveKey(message, 'invite:ty'))
    return message.channel.send({ embeds:[d], components:[row]})
  }
  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle('LINK')
        .setEmoji('📎')
            .setLabel(await resolveKey(interaction, 'invite:component'))
            .setURL('https://discord.com/api/oauth2/authorize?client_id=683366408092254275&permissions=8&scope=bot%20applications.commands'),
    );
    let d = new MessageEmbed()
    .setAuthor({ name: interaction.user.tag, iconURL:`${interaction.user.avatarURL()}`})
    .setTitle(await resolveKey(interaction, 'invite:component'))
    .setColor(COLORS.white)
    .setDescription(await resolveKey(interaction, 'invite:ty'))
    return interaction.reply({ embeds:[d], components:[row]})
  }
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('invite')
        .setDescription('Add rvein to another servers.')
    ),
    { idHints:['980198689073135646'],behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
  public registerChatInputCommand(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('invite')
        .setDescription('Add rvein to another servers.')
    ),
    { idHints:['980198689073135646'],behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
}