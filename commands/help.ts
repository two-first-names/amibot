import Discord from "discord.js";
import Command from "../models/command";
import fs from "fs";

export const name = 'help';

export const description = 'This command, shows help for all other commands.'

export const execute = (message: Discord.Message) => {
    const commands = new Discord.Collection<string, Command>();

    const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
    }

    const helpEmbed = new Discord.MessageEmbed();

    helpEmbed.setTitle('Command Help')

    for (const command of commands.values()) {
        helpEmbed.addField(command.name, command.description || "No description set")
    }

    message.channel.send(helpEmbed);
}