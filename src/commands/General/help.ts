import { sendLoadingMessage } from '../../lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions, RegisterBehavior } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';


@ApplyOptions<CommandOptions>({
	aliases: [],
	description: 'shows the commands.',
	generateDashLessAliases: true
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		let command = await args.pick('string').catch(() => 'defaulsShowHELSkt')
		if(command === "defaulsShowHELSkt") {
        const response = await sendLoadingMessage(message);

		const paginatedMessage = new PaginatedMessage({
			template: new MessageEmbed()
				.setColor('#FF0000')
			    .setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
		});
		
		const configuration = await this.container.stores.get("commands").filter(a => a.category === 'Administration').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const animals = await this.container.stores.get("commands").filter(a => a.category === 'Animals').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const anime = await this.container.stores.get("commands").filter(a => a.category === 'Anime').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const fun = await this.container.stores.get("commands").filter(a => a.category === 'Fun').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const game = await this.container.stores.get("commands").filter(a => a.category === 'Games').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const general = await this.container.stores.get("commands").filter(a => a.category === 'General').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const images = await this.container.stores.get("commands").filter(a => a.category === 'Images').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const moderation = await this.container.stores.get("commands").filter(a => a.category === 'Moderation').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const nsfw = await this.container.stores.get("commands").filter(a => a.category === 'Nsfw').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const utility = await this.container.stores.get("commands").filter(a => a.category === 'Utility').map(a => `• ${a.name} → ${a.description}`).join('\n')
		
		paginatedMessage
			.addPageEmbed((embed) =>
				embed 
				
				.setColor('#FF0000')
			    .setDescription(`If you need help about command just use \`rvein help [command]\`
				or join support server.`)
				.setTitle('Help Menu')
				.setTimestamp()
				.setThumbnail(`${this.container.client.user?.avatarURL()}`)
				.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
			    .setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
				)
			.addPageEmbed((embed) =>
			embed 
			
			.setColor('#FF0000')
			.setDescription(`${configuration}`)
			.setTitle('Configuration Commands')
			.setTimestamp()
			.setThumbnail(`${this.container.client.user?.avatarURL()}`)
			.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
			.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
		)
		.addPageEmbed((embed) =>
		embed 
		
		.setColor('#FF0000')
		.setDescription(`${animals}`)
		.setTitle('Animal Commands')
		.setTimestamp()
		.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
		.setThumbnail(`${this.container.client.user?.avatarURL()}`)
		.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
	)
	.addPageEmbed((embed) =>
	embed 
	
	.setColor('#FF0000')
	.setDescription(`${anime}`)
	.setTitle('Anime Commands')
	.setTimestamp()
	.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
	.setThumbnail(`${this.container.client.user?.avatarURL()}`)
	.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${fun}`)
.setTitle('Fun Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${game}`)
.setTitle('Game Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${general}`)
.setTitle('General Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${images}`)
.setTitle('Image Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${moderation}`)
.setTitle('Moderation Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${nsfw}`)
.setTitle('NSFW Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${utility}`)
.setTitle('Utility Commands')
.setTimestamp()
.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
			.addPageBuilder((builder) =>
			
				builder //
					
					.setEmbeds([new MessageEmbed().setColor('#FF0000')
					.setDescription(`${animals}`)
					.setTitle('Utility Commands')
					.setTimestamp()
					.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
					.setThumbnail(`${this.container.client.user?.avatarURL()}`)
					.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})])
			);

		await paginatedMessage.run(response, message.author);
		return response;
	} else {
		let cmd = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.name)
		let aliases = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.aliases).toString()
		let desc = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.description)
		let desct = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.detailedDescription).toString()
		let enabl = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.enabled)
		let flags = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.flags).toString()
		let coold = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.cooldownDelay).toString()
		let nsfwb = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.nsfw).toString()
		let runsin = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.runIn).toString()
		if(!aliases) aliases = 'None'
		if(!coold) coold = '5'
		if(!desc) desc = ["None"]
		if(!desct) desct = "None"
		if(!enabl) enabl = [true]
		if(!flags) flags = 'None'
		if(!nsfwb) nsfwb = "False"
		if(!runsin) runsin = 'TextChannel'
		let enbed = new MessageEmbed()
		.setColor('#FF0000')
		.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
		.addField('Command', `**${cmd || "help"}**`)
		.addField('Aliases', `**${aliases || "None"}**`)
		.addField('Cooldown', `**${coold || "5"}**`)
		.addField('Description', `**${desc || "None"}**`)
		.addField('Detailed Description', `**${desct || 'None'}**`)
		.addField('Enabled?', `**${enabl || 'true'}**`)
		.addField('Flags', `**${flags || 'None'}**`)
		.addField('Nsfw?', `**${nsfwb || 'false'}**`)
		.addField('Run In', `**${runsin || "Text Channel"}**`)
		.setThumbnail(`${this.container.client.user?.avatarURL()}`)
		.setFooter({ text:`${message.author.tag}`, iconURL:`${message.author.avatarURL()}`})
		await message.channel.send({ embeds:[enbed]})
	}
	};

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		let command = await interaction.options.getString('command')
		if(!command) {

		const paginatedMessage = new PaginatedMessage({
			template: new MessageEmbed()
				.setColor('#FF0000')
			    .setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
		});
		
		const configuration = await this.container.stores.get("commands").filter(a => a.category === 'Administration').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const animals = await this.container.stores.get("commands").filter(a => a.category === 'Animals').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const anime = await this.container.stores.get("commands").filter(a => a.category === 'Anime').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const fun = await this.container.stores.get("commands").filter(a => a.category === 'Fun').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const game = await this.container.stores.get("commands").filter(a => a.category === 'Games').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const general = await this.container.stores.get("commands").filter(a => a.category === 'General').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const images = await this.container.stores.get("commands").filter(a => a.category === 'Images').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const moderation = await this.container.stores.get("commands").filter(a => a.category === 'Moderation').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const nsfw = await this.container.stores.get("commands").filter(a => a.category === 'Nsfw').map(a => `• ${a.name} → ${a.description}`).join('\n')
		const utility = await this.container.stores.get("commands").filter(a => a.category === 'Utility').map(a => `• ${a.name} → ${a.description}`).join('\n')
		
		paginatedMessage
			.addPageEmbed((embed) =>
				embed 
				
				.setColor('#FF0000')
			    .setDescription(`If you need help about command just use \`rvein help [command]\`
				or join support server.`)
				.setTitle('Help Menu')
				.setTimestamp()
				.setThumbnail(`${this.container.client.user?.avatarURL()}`)
				.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
				.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
				)
			.addPageEmbed((embed) =>
			embed 
			
			.setColor('#FF0000')
			.setDescription(`${configuration}`)
			.setTitle('Configuration Commands')
			.setTimestamp()
			.setThumbnail(`${this.container.client.user?.avatarURL()}`)
			.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
			.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
		)
		.addPageEmbed((embed) =>
		embed 
		
		.setColor('#FF0000')
		.setDescription(`${animals}`)
		.setTitle('Animal Commands')
		.setTimestamp()
		.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
		.setThumbnail(`${this.container.client.user?.avatarURL()}`)
		.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
	)
	.addPageEmbed((embed) =>
	embed 
	
	.setColor('#FF0000')
	.setDescription(`${anime}`)
	.setTitle('Anime Commands')
	.setTimestamp()
	.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
	.setThumbnail(`${this.container.client.user?.avatarURL()}`)
	.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${fun}`)
.setTitle('Fun Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${game}`)
.setTitle('Game Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${general}`)
.setTitle('General Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${images}`)
.setTitle('Image Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${moderation}`)
.setTitle('Moderation Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${nsfw}`)
.setTitle('NSFW Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
.addPageEmbed((embed) =>
embed 

.setColor('#FF0000')
.setDescription(`${utility}`)
.setTitle('Utility Commands')
.setTimestamp()
.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
.setThumbnail(`${this.container.client.user?.avatarURL()}`)
.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})
)
			.addPageBuilder((builder) =>
			
				builder //
					
					.setEmbeds([new MessageEmbed().setColor('#FF0000')
					.setDescription(`${animals}`)
					.setTitle('Utility Commands')
					.setTimestamp()
					.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
					.setThumbnail(`${this.container.client.user?.avatarURL()}`)
					.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})])
			);

		await paginatedMessage.run(interaction, interaction.user);
	} else {
		let cmd = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.name)
		let aliases = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.aliases).toString()
		let desc = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.description)
		let desct = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.detailedDescription).toString()
		let enabl = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.enabled)
		let flags = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.flags).toString()
		let coold = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.cooldownDelay).toString()
		let nsfwb = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.nsfw).toString()
		let runsin = this.container.stores.get("commands").filter(a => a.name === command).map(a => a.options.runIn).toString()
		if(!aliases) aliases = 'None'
		if(!coold) coold = '5'
		if(!desc) desc = ["None"]
		if(!desct) desct = "None"
		if(!enabl) enabl = [true]
		if(!flags) flags = 'None'
		if(!nsfwb) nsfwb = "False"
		if(!runsin) runsin = 'TextChannel'
		let enbed = new MessageEmbed()
		.setColor('#FF0000')
		.setAuthor({ name:`${this.container.client.user?.username}`, iconURL:`${this.container.client.user?.avatarURL()}`})

		.addField('Command', `**${cmd || "help"}**`)
		.addField('Aliases', `**${aliases || "None"}**`)
		.addField('Cooldown', `**${coold || "5"}**`)
		.addField('Description', `**${desc || "None"}**`)
		.addField('Detailed Description', `**${desct || 'None'}**`)
		.addField('Enabled?', `**${enabl || 'true'}**`)
		.addField('Flags', `**${flags || 'None'}**`)
		.addField('Nsfw?', `**${nsfwb || 'false'}**`)
		.addField('Run In', `**${runsin || "Text Channel"}**`)
		.setThumbnail(`${this.container.client.user?.avatarURL()}`)
		.setFooter({ text:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
		await interaction.reply({ embeds:[enbed], ephemeral: true})
	}
	};

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
			.setName('help')
			.setDescription('Shows the commands.')
			.addStringOption(a => a.setName('command').setRequired(false).setDescription('the command'))
		);
		{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
	  }

	  public registerChatInputCommand(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
		  builder
			.setName('help')
			.setDescription('Shows the commands.')
			.addStringOption(a => a.setName('command').setRequired(false).setDescription('the command'))
		);
		{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
	  }


}