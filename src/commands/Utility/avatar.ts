//import { sendLoadingMessage } from '../../lib/utils';
import { Args, Command, RegisterBehavior } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import humanize from 'humanize-duration';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'avatar',
        aliases: [''],
        description: 'shows the avatar of user.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      let user = await args.pick('user').catch(() => message.author)
      if (!user.avatarURL()) {
        let avatar = new MessageEmbed()
        .setAuthor({ name:`${user.tag}`, iconURL: `${user.defaultAvatarURL}`})
        .setColor(COLORS.white)
        .setImage(user.defaultAvatarURL)
        message.channel.send({ embeds:[avatar]})
      } else {
      if (user.avatarURL({ dynamic: true})?.endsWith('.gif')) {
            let avatar = new MessageEmbed()
            .setAuthor({ name:`${user.tag}`, iconURL: `${user.avatarURL()}`})
      .setColor(COLORS.white)
      .setImage(`${user.avatarURL({ size: 2048, dynamic: true, format: "gif" })}`)
      .addField("Avatar as", `**1024p** [gif](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) | [png](${user.avatarURL({ size: 1024, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, format: "webp" })})\n**2048p** [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) | [png](${user.avatarURL({ size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048})}) | [webp](${user.avatarURL({size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)
  
  
    message.channel.send({ embeds:[avatar]})
        
      } else {
        let avatar = new MessageEmbed()
      .setAuthor({ name:`${user.tag}`, iconURL: `${user.avatarURL()}`})
      .setColor(COLORS.white)
      .setImage(`${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}`)
     .addField("Avatar as", `**1024p**`+ /*[](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) |*/ ` [png](${user.avatarURL({ size: 1024, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, dynamic: true, format: "webp" })})\n**2048p**`+/* [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) |*/` [png](${user.avatarURL({dynamic: true, size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)
  
        //.addField("Avatar as", `[png](${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 2048, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 2048, dynamic: true, format: "webp" })})`)
    message.channel.send({ embeds:[avatar]})
      }
    }
    
    };
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
      let user = await interaction.options.getUser('member')
      if(!user) user = interaction.user;
      if (!user?.avatarURL()) {
        let avatar = new MessageEmbed()
        .setAuthor({ name:`${user?.tag}`, iconURL: `${user?.defaultAvatarURL}`})
        .setColor(COLORS.white)
        .setImage(`${user?.defaultAvatarURL}`)
        await interaction.reply({ embeds:[avatar]})
      } else {
      if (user.avatarURL({ dynamic: true})?.endsWith('.gif')) {
            let avatar = new MessageEmbed()
            .setAuthor({ name:`${user.tag}`, iconURL: `${user.avatarURL()}`})
      .setColor(COLORS.white)
      .setImage(`${user.avatarURL({ size: 2048, dynamic: true, format: "gif" })}`)
      .addField("Avatar as", `**1024p** [gif](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) | [png](${user.avatarURL({ size: 1024, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, format: "webp" })})\n**2048p** [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) | [png](${user.avatarURL({ size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048})}) | [webp](${user.avatarURL({size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)
  
  
    await interaction.reply({ embeds:[avatar]})
        
      } else {
        let avatar = new MessageEmbed()
      .setAuthor({ name:`${user.tag}`, iconURL: `${user.avatarURL()}`})
      .setColor(COLORS.white)
      .setImage(`${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}`)
     .addField("Avatar as", `**1024p**`+ /*[](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) |*/ ` [png](${user.avatarURL({ size: 1024, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, dynamic: true, format: "webp" })})\n**2048p**`+/* [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) |*/` [png](${user.avatarURL({dynamic: true, size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)
  
        //.addField("Avatar as", `[png](${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 2048, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 2048, dynamic: true, format: "webp" })})`)
    await interaction.reply({ embeds:[avatar]})
      }
  
    }
    }
    public override registerApplicationCommands(registry: Command.Registry) {
      registry.registerChatInputCommand((builder) =>
        builder
        .setName('avatar')
        .setDescription(this.description)
        .addUserOption(a => a.setName('member').setRequired(false).setDescription('the member'))
      );
      { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
      }
  
      public registerChatInputCommand(registry: Command.Registry) {
      registry.registerChatInputCommand((builder) =>
        builder
        .setName('avatar')
        .setDescription(this.description)
        .addUserOption(a => a.setName('member').setRequired(false).setDescription('the member'))
    
      );
      { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
      }
}