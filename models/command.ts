import {Message} from "discord.js";

export default interface Command {
    name: string,
    execute: (message: Message, args: string[]) => void
}