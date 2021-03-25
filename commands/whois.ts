import IRE from "../ire";
import Discord from "discord.js";

export const name = 'whois';
export const aliases = ['finger'];

export const description = 'Displays information on a specific player. Usage: !whois Amirae'

export const execute = async (message: Discord.Message, args: [string]) => {
    const name = args[0];
    if(name === undefined) {
        message.channel.send("Please specify a character name.");
        return;
    }
    try {
        const character = await IRE.getCharacter(name);

        let colour = '#696969';

        switch (character.faction) {
            case "Magnagora":
                colour = "#a0522d";
                break;
            case "Celest":
                colour = "#0000ff";
                break;
            case "Hallifax":
                colour = "#00ced1";
                break;
            case "Gaudiguch":
                colour = "#b2221d";
                break;
            case "Glomdoring":
                colour = "#9932cc";
                break;
            case "Serenwilde":
                colour = "#00db7f";
                break;
            case "Multiverse":
                colour = "#daa51b";
                break;
        }

        if(character.name === "Amirae")
            colour = 'LUMINOUS_VIVID_PINK';

        const characterEmbed = new Discord.MessageEmbed()
            .setTitle(character.fullname)
            .setColor(colour)
            .addField('Faction', character.faction)
            .addField('Guild', character.guild)
            .addField('Level', character.level, true)
            .addField('Kills', character.kills, true)
            .addField('Deaths', character.deaths, true)
            .addField('Explorer Rank', character.explorerrank);

        if(character.description.length <= 1024)
            characterEmbed.addField('Description', character.description);

        message.channel.send(characterEmbed);
    } catch (error) {
        if(error.response) {
            message.channel.send(error.response.data);
        } else {
            message.channel.send(error.message);
        }
    }
}