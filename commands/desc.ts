import IRE from "../ire";
import Discord from "discord.js";

export const name = 'desc';
export const aliases = ['description'];

export const description = 'Displays a character\'s description. Usage: !desc Amirae'

export const execute = async (message: Discord.Message, args: [string]) => {
    const name = args[0];
    if(name === undefined) {
        message.channel.send("Please specify a character name.");
        return;
    }
    try {
        const character = await IRE.getCharacter(name);

        message.channel.send(character.description);
    } catch (error) {
        if(error.response) {
            message.channel.send(error.response.data);
        } else {
            message.channel.send(error.message);
        }
    }
}