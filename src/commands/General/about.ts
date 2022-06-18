import { Command, RegisterBehavior } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../config';
//import sapphire from '@sapphire/framework'

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'about',
        description: 'Sends info about rvein.',
      });
  }
  public async messageRun(message: Message) {
    const client = this.container.client;
  let e = new MessageEmbed()
  .setAuthor({ name: `${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
  .setColor(COLORS.white)
.setThumbnail(`${client.user?.avatarURL()}`)
.addField(await resolveKey(message, 'about:developers'), `Evils#8408\nArdavein#3565`)
.addField(await resolveKey(message, 'about:madewith'), `<:noodejs:975102605573378119> [Node.js](https://nodejs.org/)\n<:djs:980049205559189504> [Discord.js](https://discord.js.org/)\n<:sapphire:980048786661441556> [sapphire](https://www.sapphirejs.dev/)\n<:typescript:980049182746378240> [typescript](https://www.typescriptlang.org/)\n<:mongoDB:987285192337162240> [MongoDB](https://www.mongodb.com/)`)
//.addField('Versions', `Sapphire: ${version}\nDiscord.js`)
.addField(await resolveKey(message, 'about:statics'), `${client.guilds.cache.size} ${await resolveKey(message, 'about:servers')}\n${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} ${await resolveKey(message, 'about:users')}`)
.addField(await resolveKey(message, 'about:tags'), `Polls, Utility, Moderation, Fun, Meme, Pokemon, Welcomes, Autoroles & Autobotroles, Logging, Suggestions, Information`)
// .setImage(ress)
.addField(await resolveKey(message, 'about:urls'), `[Invite](http://gg.gg/rveininv) | [Support Server](https://discord.gg/zDVbjcK)`)                                                                
  message.channel.send({ embeds:[e]})
  }

  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    const client = this.container.client;
  let e = new MessageEmbed()
  .setAuthor({ name: `${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
  .setColor(COLORS.white)
.setThumbnail(`${client.user?.avatarURL()}`)
.addField(await resolveKey(interaction, 'about:developers'), `Evils#8408\nArdavein#3565`)
.addField(await resolveKey(interaction, 'about:madewith'), `<:noodejs:975102605573378119> [Node.js](https://nodejs.org/)\n<:djs:980049205559189504> [Discord.js](https://discord.js.org/)\n<:sapphire:980048786661441556> [sapphire](https://www.sapphirejs.dev/)\n<:typescript:980049182746378240> [typescript](https://www.typescriptlang.org/)\n<:mongoDB:987285192337162240> [MongoDB](https://www.mongodb.com/)`)
//.addField('Versions', `Sapphire: ${version}\nDiscord.js`)
.addField(await resolveKey(interaction, 'about:statics'), `${client.guilds.cache.size} ${await resolveKey(interaction, 'about:servers')}\n${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} ${await resolveKey(interaction, 'about:users')}`)
.addField(await resolveKey(interaction, 'about:tags'), `Polls, Utility, Moderation, Fun, Meme, Pokemon, Welcomes, Autoroles & Autobotroles, Logging, Suggestions, Information`)
// .setImage(ress)
.addField(await resolveKey(interaction, 'about:urls'), `[Invite](http://gg.gg/rveininv) | [Support Server](https://discord.gg/zDVbjcK)`)                                  
await interaction.reply({ embeds:[e]})
}
  public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
			.setName('about')
			.setDescription('Shows the informations about bot.')
		);
		{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
	  }

	  public registerChatInputCommand(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
			.setName('about')
			.setDescription('Shows the informations about bot.')
  
		);
		{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
	  }
}