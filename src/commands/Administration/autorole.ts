import { Message, MessageEmbed } from 'discord.js';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { COLORS, PREFIX } from '../../config';
import type { Args } from '@sapphire/framework';
import Guild from '../../models/Guild';


export class SubCommands extends  SubCommandPluginCommand {
    public constructor(context: SubCommandPluginCommand.Context, options: SubCommandPluginCommand.Options) {
      super(context, {
          ...options,
		  name: 'autorole',
		  description: '',
		  aliases: [],
		  preconditions: ['GuildOnly'],
          requiredUserPermissions: ['MANAGE_GUILD'],
		  subCommands: [
			  'show',
			  'humans',
			  'message',
			  { input: 'show', default: true },
			  { input: 'humans', output: 'humans' },
			  { input: 'bots', output: 'bots' },
		  ]
        });
    }

	public async show(message: Message) {
        const g = await Guild.findOne({ guild: message.guild?.id })
        const client = this.container.client
    let a = g ? g.prefix ?? PREFIX : PREFIX
let e = new MessageEmbed()
.setAuthor({ name:`${client.user?.username} Welcome System`, iconURL: message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL})
.setDescription(`Rvein autorole system gives role to new members`)
.setColor(COLORS.white)
.addField(`Autoroles`, `\n**Auto role**: ${client.user?.username} gives role specified in database to new joined all members\n**Auto human role**: Rvein gives only role specified in the database to new joined humans\nSet \`${a}autorole human <role>\`\nReset \`${a}autorole bot reset\`\n\n**Auto bot role**: ${client.user?.username} gives only role specified in the database to new joined bots\nSet \`${a}autorole bot <role>\`\nReset \`${a}autorole bot reset\``)

     message.channel.send({ embeds:[e]})
	}



    public async humans(message: Message, args: Args) {
        let channels = await args.pick('role');
        let channel = channels.id;

        const guild = await Guild.findOne({ guild: message.guild?.id })
        
        if(guild) {
            await guild.updateOne({ 'autoroles.human': channel})
        } else {
            new Guild({
                guild: message.guild?.id,
                'autoroles.human': channel
            })
        }

        return await message.channel.send(`Autorole for humans has been set`)
    }

    public async bots(message: Message, args: Args) {
        let channels = await args.pick('role');
        let channel = channels.id;

        const guild = await Guild.findOne({ guild: message.guild?.id })
        
        if(guild) {
            await guild.updateOne({ 'autoroles.bot': channel})
        } else {
            new Guild({
                guild: message.guild?.id,
                'autoroles.bot': channel
            })
        }

        return await message.channel.send(`Autorole for bots has been set`)
    }


}