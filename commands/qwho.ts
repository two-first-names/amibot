import IRE from "../ire";
import Discord from "discord.js";

export const name = 'qwho';

export const execute = async (message: Discord.Message, args: [string]) => {
    try {
        const characters = await IRE.getCharacters();

        const characterEmbed = new Discord.MessageEmbed()
            .setTitle('Currently online characters')
            .addField('Count', characters.count)
            .addField('Characters', characters.characters.map(c => c.name).join(', '))

        message.channel.send(characterEmbed);
    } catch (error) {
        if(error.response) {
            message.channel.send(error.response.data);
        } else {
            message.channel.send(error.message);
        }
    }
}