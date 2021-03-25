import Discord, {Message} from "discord.js"
import * as fs from "fs";
import Command from "./models/command";
import express, {Request, Response} from "express"

const client = new Discord.Client();
const commands = new Discord.Collection<string, Command>();

const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
    for (const alias of command.aliases) {
        command.set(alias, command);
    }
}

const prefix = '!'

client.on('message', async (message: Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || "";

    if (!commands.has(command)) return;

    try {
        await commands.get(command)?.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('there was an error trying to execute that command!');
    }
})


client.login(process.env.DISCORD_TOKEN)

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("This isn't a real web server.")
})

app.listen(process.env.PORT);