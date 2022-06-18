import { send } from '@sapphire/plugin-editable-commands';
import { Message, MessageEmbed } from 'discord.js';
import { parseURL } from '@sapphire/utilities';
import { RandomLoadingMessage } from './constants';
import { COLORS } from '../config';

 export const kaomoji = [
    '(*^ω^)',
    '(◕‿◕✿)',
    '(◕ᴥ◕)',
    'ʕ•ᴥ•ʔ',
    'ʕ￫ᴥ￩ʔ',
    '(*^.^*)',
    'owo',
    'OwO',
    '(｡♥‿♥｡)',
    'uwu',
    'UwU',
    '(*￣з￣)',
    '>w<',
    '^w^',
    '(つ✧ω✧)つ',
    '(/ =ω=)/'
];
 export const IMAGE_EXTENSION = /\.(bmp|jpe?g|png|gif|webp)$/i;
 export const list = ["yes", "no", "ofc", "yep", "nope", "eh no?", "nah", "never", ":flushed:"]
export function pickRandom<T>(array: readonly T[]): T {
	const { length } = array;
	return array[Math.floor(Math.random() * length)];
}

 export function getImageUrl(url: string): string | undefined {
	const parsed = parseURL(url);
	return parsed && IMAGE_EXTENSION.test(parsed.pathname) ? parsed.href : undefined;
}
 export function eightball() {
	 let s = Math.floor(Math.random() * list.length)
	return list[s]
 }

export default function owoify(text: string) {
    let s = text
        .replace(/(?:l|r)/g, 'w')
        .replace(/(?:L|R)/g, 'W')
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])|N([AEIOU])/g, 'Ny$1')
        .replace(/ove/g, 'uv')
        .replace(/nd(?= |$)/g, 'ndo')
        .replace(/!+/g, ' ');
		return s + pickRandom(kaomoji)
}

	
export function sendLoadingMessage(message: Message): Promise<typeof message> {
	let d =new MessageEmbed()
	.setDescription(pickRandom(RandomLoadingMessage))
	.setColor(COLORS.white)
	return send(message, { embeds:[d] });
}

export const NUMBERS: { [key: string]: string } = {
	'1': 'one',
	'2': 'two',
	'3': 'three',
	'4': 'four',
	'5': 'five',
	'6': 'six',
	'7': 'seven',
	'8': 'eight',
	'9': 'nine',
	'0': 'zero'
};

export const SYMBOLS: { [key: string]: string } = {
	'!': 'exclamation',
	'?': 'question'
};

export const emojify = (input: string): string => {
	let res = '';
	input.split('').forEach((char) => {
		if (/[a-zA-Z]/.test(char)) {
			res += `:regional_indicator_${char}:`;
		} else if (NUMBERS[char] !== undefined) {
			res += `:${NUMBERS[char]}:`;
		} else if (SYMBOLS[char] !== undefined) {
			res += `:${SYMBOLS[char]}:`;
		} else {
			res += char;
		}

		res += ' ';
	});

	res = res.replace(':exclamation: :exclamation:', ':bangbang:');
	res = res.replace(':exclamation: :question:', ':interrobang:');

	return res.trim();
};
