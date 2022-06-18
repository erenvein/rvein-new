import { Message, MessageEmbed } from 'discord.js';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { COLORS, PREFIX } from '../../config';
import type { Args } from '@sapphire/framework';
import Guild from '../../models/Guild';

export class SubCommands extends  SubCommandPluginCommand {
    public constructor(context: SubCommandPluginCommand.Context, options: SubCommandPluginCommand.Options) {
      super(context, {
          ...options,
		  name: 'welcome',
		  description: '',
		  aliases: ['welcomers', 'welcomer', 'greet', 'greeting', 'greetings'],
		  preconditions: ['GuildOnly'],
          requiredUserPermissions: ['MANAGE_GUILD'],
		  subCommands: [
			  'show',
			  'channel',
			  'message',
			  { input: 'show', default: true },
			  { input: 'channel', output: 'channel' },
			  { input: 'message', output: 'message' },
		  ]
        });
    }

	public async show(message: Message) {
        let g = await Guild.findOne({ guild: message.guild?.id})
        const client = this.container.client
    let a = g ? g.prefix ?? PREFIX : PREFIX
let e = new MessageEmbed()
.setAuthor({ name:`${client.user?.username} Welcome System`, iconURL: message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL})
.setDescription(`${client.user?.username} sends custom message to custom welcome channel`)
.setColor(COLORS.white)
.addField(`Welcome Channel`, `**Welcome channel**: The channel what customizable channel to ${client.user?.username} sends message when triggered a member joined to server\nSet - \`${a}welcome channel <channel>\`\nReset - \`${a}welcome channel reset\``)
.addField(`Welcome Message`, `**Welcome message**: The message what customazible message to ${client.user?.username} sends this message when triggered a member joined to server\nSet - \`${a}welcome message <message>\`\nReset - \`${a}welcome message reset\`\n\n**Variables**: You can use variables to customizable welcome message\n\`{member}\` - Mention member\n\`{member.username}\` - Username of member\n\`{member.id}\` - ID of member`)
     message.channel.send({ embeds:[e]})
	}



    public async channel(message: Message, args: Args) {
        let channels = await args.pick('channel');
        let channel = channels.id;

        const guild = await Guild.findOne({ guild: message.guild?.id})
        
        if(guild) {
            await new guild({
                guild: message.guild?.id,
                'welcome.channel': channel
            }).save()
        } else {
            await new guild({
                guild: message.guild?.id,
                'welcome.channel': channel
            }).save()
        }

        return await message.channel.send(`Welcome channel has been set`)
    }

    public async message(message: Message, args: Args) {
        let welcomemsg = await args.rest('string');

        const guild = await Guild.findOne({ guild: message.guild?.id})
        
        if(guild) {
            await new guild({
                guild: message.guild?.id,
                'welcome.message': welcomemsg
            }).save()
        } else {
            await new guild({
                guild: message.guild?.id,
                'welcome.message': welcomemsg
            }).save()

        return await message.channel.send(`Welcome message has been set`)
    }
    }


}