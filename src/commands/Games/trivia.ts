import { pickRandom } from '../../lib/utils';
import { Args, Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { Category, getQuestions } from 'open-trivia-db';
import { COLORS } from '../../config';
import { Time } from '@sapphire/time-utilities';

export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'trivia',
        description: 'sa.',
      });
  }
  public async messageRun(message: Message, args: Args) {
    let mod = await args.pick('string').catch(() => 'easy')
    let arrrayyy = [
        Category.allNames.ANIMALS,
        Category.allNames.ART,
        Category.allNames.CELEBRITIES,
        Category.allNames.ENTERTAINMENT_BOARD_GAMES,
        Category.allNames.ENTERTAINMENT_BOOKS,
        Category.allNames.ENTERTAINMENT_CARTOON_AND_ANIMATIONS,
        Category.allNames.ENTERTAINMENT_COMICS,
        Category.allNames.ENTERTAINMENT_FILM,
        Category.allNames.ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA,
        Category.allNames.ENTERTAINMENT_MUSIC,
        Category.allNames.ENTERTAINMENT_MUSICALS_AND_THEATRES,
        Category.allNames.ENTERTAINMENT_TELEVISION,
        Category.allNames.ENTERTAINMENT_VIDEO_GAMES,
        Category.allNames.GENERAL_KNOWLEDGE,
        Category.allNames.GEOGRAPHY,
        Category.allNames.HISTORY,
        Category.allNames.MYTHOLOGY,
        Category.allNames.POLITICS,
        Category.allNames.SCIENCE_AND_NATURE,
        Category.allNames.SCIENCE_COMPUTERS,
        Category.allNames.SCIENCE_GADGETS,
        Category.allNames.SCIENCE_MATHEMATICS,
        Category.allNames.SPORTS,
        Category.allNames.VEHICLES,
    ]
    let sa = pickRandom(arrrayyy)
    if(mod === "easy" || mod === "medium" || mod==="hard") {
    const questions = await getQuestions({
      amount: 1,
      difficulty: mod,
      type: 'multiple',
      category: sa
    });
  
    
    let megaaa = questions[0].allAnswers.join('\n')
    let embed = new MessageEmbed()
    .setColor(COLORS.white)
    .setTitle('Trivia')
    .setTimestamp()
    .setThumbnail(`https://media.discordapp.net/attachments/986632936843542549/987397210016727151/logo.png`)
    .setAuthor({ name:`${questions[0].category}`, iconURL:`https://media.discordapp.net/attachments/986632936843542549/987397210016727151/logo.png`})
    .setDescription(`**${questions[0].value}**\n\n${megaaa}`)
    .setFooter({ text:`Difficulty: ${mod}`})

    const sssa = await message.channel.send({ embeds: [embed]})
    const filter = (m: any)=> m.content.includes(questions[0].correctAnswer);
    let collector = await message.channel.createMessageCollector({ filter, time: Time.Second * 15})
    collector.on('collect', m => {
        sssa.edit(`The answer has been guessed by <@${m.author.id}>, answer was **${questions[0].correctAnswer}**`)
        collector.stop()
    });
  
} else {

}
  }
}