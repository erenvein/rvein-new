//import { sendLoadingMessage } from '../../lib/utils';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import GoogleImages = require("google-images");
import { COLORS } from '../../config';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'image',
        nsfw: true,
        aliases: ['img'],
        description: 'Searches for a image in google.',
      });
  }
  public async messageRun(message: Message, args: Args) {
      const a = await args.rest('string')
      const googleImages = new GoogleImages("009566364478457158503:3g3icphwlh0","AIzaSyDmohgZZEZzVxWasrX0KTrswbld4M0MwaE");
      const results = await googleImages.search(a);
      if (!results.length) return message.reply(`I couldnt found anything on google.`)
        
      const response = await message.channel.send('Results:');

      const paginatedMessage = new PaginatedMessage({
          template: new MessageEmbed()
              .setColor(COLORS.white)
              .setFooter({ text: 'Page: ' })
    
      }
      );
      paginatedMessage
          .addPageEmbed((embed) =>
          embed //
          .setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
          .setImage(results[0].url)
     
      )
      .addPageEmbed((embed) =>
      embed //
      .setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
      .setImage(results[1].url)
  )
  .addPageEmbed((embed) =>
  embed //
  .setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
  .setImage(results[2].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[3].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[4].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[5].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[6].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[7].url)
)
.addPageEmbed((embed) =>
embed //
.setAuthor({ name: `${this.container.client.user?.tag}`, iconURL:`${this.container.client.user?.avatarURL()}`})
.setImage(results[8].url)
)
          .addPageBuilder((builder) =>
          builder 
              .setEmbeds([new MessageEmbed().setImage(results[9].url)])
      )
      await paginatedMessage.run(response, message.author);
      return response;
    };
  
}