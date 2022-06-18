import { Args, Command, RegisterBehavior } from '@sapphire/framework';
import type { Message } from 'discord.js';
import Guild from '../../models/Guild';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'language',
        description: 'Sets language for server',
        requiredUserPermissions: ['MANAGE_GUILD']
      });
  }
  public async messageRun(message: Message, args: Args) {
      let lang = await args.pick('string')
      
      const guild = await Guild.findOne({ guild: message.guild?.id })
      if(lang === "tr") {
          let langus = lang.replace('tr', 'tr-TR').replace('en', 'en-US')
        if (guild) {
			await guild.updateOne({ language: langus});
    }
		else {
			new Guild({
        guild: message.guild?.id,
        language: langus
      }).save()
    return await message.channel.send('Dil başarıyla değiştirildi.');
      }
    }
      if(lang === "en") {
        let langus = lang.replace('tr', 'tr-TR').replace('en', 'en-US')
        if (guild) {
          await guild.updateOne({ language: langus});
    }
		else {
      new Guild({
        guild: message.guild?.id,
        language: langus
      }).save()
    }
    return await message.channel.send('Language has been set.');
      }

      
  }
  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let lang = await interaction.options.getString('language')
      
    const guild = await Guild.findOne({ guild: interaction.guild?.id })
    if(lang === "tr") {
        let langus = lang.replace('tr', 'tr-TR').replace('en', 'en-US')
      if (guild) {
          await guild.updateOne({ language: langus})
  }
      else {
        new Guild({
          guild: interaction.guild?.id,
          language: langus
        }).save()
  }
  return await interaction.reply('Dil başarıyla değiştirildi.');
    }
    if(lang === "en") {
      let langus = lang.replace('tr', 'tr-TR').replace('en', 'en-US')
      if (guild) {
        new Guild({
          guild: interaction.guild?.id,
          language: langus
        }).save()
  }
      else {
        new Guild({
          guild: interaction.guild?.id,
          language: langus
        }).save()
  }
  return await interaction.reply('Language has been set.');
    }
   }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('setlang')
        .setDescription('Sets language for server.')
        .addStringOption(a => a.setName('language').setDescription('the language').setRequired(true))
    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }

  public registerChatInputCommand(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('setlang')
        .setDescription('Sets language for server.')
        .addStringOption(a => a.setName('language').setDescription('the language').setRequired(true))

    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
}