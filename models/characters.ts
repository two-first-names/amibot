interface CharactersEntry {
    uri: string,
    name: string
}

export default interface Characters {
    count: number,
    characters: [CharactersEntry]
}