import axios from "axios";

import Characters from "./models/characters";
import Character from "./models/character"

class IRE {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    capitalise(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    async getCharacters(): Promise<Characters> {
        const res = await axios.get<Characters>(`https://${this.url}/characters.json`)
        return res.data;
    }

    async getCharacter(name: string): Promise<Character> {
        const res = await axios.get<Character>(`https://${this.url}/characters/${name}.json`)
        const character = res.data;
        character.faction = this.capitalise(character.faction);
        character.guild = this.capitalise(character.guild);
        character.explorerrank = this.capitalise(character.explorerrank);
        return character;
    }
}

export default new IRE(process.env.IRE_API_URL || 'api.lusternia.com');