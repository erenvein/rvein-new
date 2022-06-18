import { pickRandom } from '../../lib/utils';
import { Command, RegisterBehavior } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
let jokeArray = [
  'What did the drummer call his twin daughters? Anna one, Anna two!',
  'How did Darth Vader know what Luke got him for Christmas? He felt his presents!',
  "Did you hear about the chameleon who couldn't change color? He had a reptile dysfunction.",
  'I wanted to go on a diet, but I feel like I have way too much on my plate right now.',
  "Want to hear a joke about construction? I'm still working on it.",
  'What’s Forrest Gump’s password? 1forrest1',
  'What sound does a witches car make? Broom Broom',
  'To whoever stole my copy of Microsoft Office, I will find you. You have my Word!',
  'What does a zombie vegetarian eat? “GRRRAAAIINS!”',
  'This graveyard looks overcrowded. People must be dying to get in there.',
  'What does a nosey pepper do? It gets jalapeno business!',
  "I tell dad jokes, but I don't have any kids. I'm a faux pa.",
  'Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, ”No, just leave it in the carton!”',
  'Two goldfish are in a tank. One says to the other, ”do you know how to drive this thing?”',
  'What’s that Nevada city where all the dentists visit? Floss Vegas.',
  'You’re American when you go into the bathroom, and you’re American when you come out, but do you know what you are while you’re in there? European.',
  'Why did the picture go to jail? Because it was framed.',
  'What do you call a bear without any teeth? A gummy bear!',
  "What do you call a hippie's wife? Mississippi.",
  'The shovel was a ground-breaking invention.',
  "Dad, can you put the cat out? I didn't know it was on fire.",
  'Does anyone need an ark? I Noah guy!',
  'How do you make holy water? You boil the hell out of it.',
  '5/4 of people admit that they’re bad with fractions.',
  'I would avoid the sushi if I was you. It’s a little fishy.',
  "To the man in the wheelchair that stole my camouflage jacket... You can hide but you can't run.",
  'What do you call a fish with two knees? A two-knee fish!',
  "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
  'Why did the chicken cross the road? Because it had to get the the other side',
    "A man walked into a bar. The other one ducked.",
    "Dad, can you put my shoes on? No, I don't think they'll fit me.",
    "Why couldn't a bicycle stand up? Because it was too tired!",
    "Did you get a haircut? No, I got them all cut.",
    "Why don't skeletons ever go trick or treating? Because they have no body to go with.",
    "What did the spider do on the computer? Made a website!",
    "What’s brown and sticky? A stick.",
    "How many apples grow on a tree? All of them.",
    "How does an eskimo build his house? Igloos it together.",
    "Why do crabs never give to charity? Because they're shellfish.",
    "How much does a hipster weigh? An instagram.",
    "A Sandwich walks into a bar, the bartender says \"Sorry, we don't serve food here\".",
    "Why don't seagulls fly over the bay? Because then they'd be bay-gulls!",
    "The shovel was a ground-breaking invention.",
    "Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!",
    "Did you know the first French fries weren't actually cooked in France? They were cooked in grease.",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
    "What do prisoners use to call each other? Cell phones.",
    "Why aren't koalas considered bears? They don't have the koalafications.",
    "What do you call a man with a rubber toe? Roberto.",
    "Did you hear about the kidnapping at school? It's fine, he woke up.",
    "A furniture store keeps calling me. All I wanted was one night stand.",
    "This is a robbery! no its not, its bank."
  ]
export class SubCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
        ...options,
        name: 'dadjoke',
        description: 'tells a dadjoke.',
      });
  }
  public async messageRun(message: Message) {
      
      let s = await pickRandom(jokeArray)
      return send(message, {content:s})
  }
  public async chatInputRun(interaction: Command.ChatInputInteraction) {
    let s = await pickRandom(jokeArray)
    await interaction.reply(s)
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('dadjoke')
        .setDescription('Tells you a dadjoke.')
    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }

  public registerChatInputCommand(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('dadjoke')
        .setDescription('Tells you a dadjoke.')
    );
    { behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
  }
}