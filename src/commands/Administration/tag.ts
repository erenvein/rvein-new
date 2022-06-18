import type { Args } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { COLORS } from '../../config';
import { sendLocalized } from '@sapphire/plugin-i18next';
import model from '../../models/Guild'

export class SubCommands extends  SubCommandPluginCommand {
    public constructor(context: SubCommandPluginCommand.Context, options: SubCommandPluginCommand.Options) {
      super(context, {
          ...options,
		  name: 'tag',
		  description: '',
		  aliases: ['tags'],
		  preconditions: ['GuildOnly'],
		  subCommands: [
			  'show',
			  'create',
			  'del',
			  'list',
			  'nsfw',
			  { input: 'show', default: true },
			  { input: 'add', output: 'create' },
			  { input: 'delete', output: 'del' },
			  { input: 'list', output: 'list' },
			  { input: 'nsfw', output: 'nsfw' },
		  ]
        });
    }
	public async show(message: Message, args: Args) {
		const tags = await model.findOne({ guild: message.guild?.id })
		const name = await args.pick('string')

		if (tags) {
			if (tags.tags) {
		if (typeof tags.tags.find((gobr: any) => gobr.name === name) !== "undefined") {  
					message.reply(`${tags.tags.find((gobr: { name: any; }) => gobr.name === name).response}`);
				}
			}

	}
}

	public async create(message: Message, args: Args) {
		const tags = await model.findOne({ guild: message.guild?.id })
		const name = await args.pick('string')
		const content = await args.rest('string')

		if (!tags)  {
			const db = new model({
			  guild: message.guild?.id,
			  $push: { tags: { name: name, response: content, owner: message.author.id } }
			  
			})
			db.save().then(async() => {
				const tags = await model.findOne({ guild: message.guild?.id})
				tags.updateOne({$push: { tags: { name: name, response: content, owner: message.author.id } } })
			})
			
		 }
		else {
			await tags.updateOne({ $push: { tags: { name: name, response: content, owner: message.author.id, nsfw: false } } })
		}
	

		return await sendLocalized(message, { keys:'tag:tagCreated', formatOptions: { name: name}})
	}

	public async del(message: Message, args: Args) {
		const name = await args.pick('string')
		const tags = await model.findOne({ guild: message.guild?.id })

		if (!tags.tags.find((gobr: any) => gobr.name === name)) return;
		await tags.updateOne({ $pull: { tags: { name: name } } } )
		return await sendLocalized(message, { keys:'tag:tagDeleted', formatOptions: { name: name}})
	}

	public async list(message: Message) {
		const tags = await model.findOne({ guild: message.guild?.id })

        
		let e = new MessageEmbed()
		.setColor(COLORS.white)
		.setDescription(`${tags.tags.map((e: { name: any; }) => e.name).join(" | ")}`)
		.setAuthor({ name:`${message.guild?.name}`, iconURL:`${message.guild?.iconURL()}`})
		message.channel.send({ embeds:[e]})
	}

	/*public async nsfw(message: Message, args: Args) {
		const name = await args.pick('string')

		const exists = await this.container.client.db.tag.findUnique({
			where: {
				name_id: {
					name,
					id: message.guild?.id!,
				}
			}
		});
        if(!exists) return await sendLocalized(message, { keys:'tag:tagNo'})
		
		if(exists.ownerID === message.author.id) {
			if(exists.nsfw === true) {
				await this.container.client.db.tag.update({
					where: {
						name_id: {
							name,
							id: message.guild?.id!
						}
					},
					data: {
						nsfw: false
					}
				});
		
				return await sendLocalized(message, { keys:'tag:tagNsfw2', formatOptions: { name: name}})
			}
		await this.container.client.db.tag.update({
			where: {
				name_id: {
					name,
					id: message.guild?.id!
				}
			},
			data: {
				nsfw: true
			}
		});

		return await sendLocalized(message, { keys:'tag:tagNsfw', formatOptions: { name: name}})
	}
	}*/


}