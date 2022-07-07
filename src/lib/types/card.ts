export interface Card {
    text: string,
    tags: Tag[],
    time?: string,
    date?: string,
    checked: boolean,
}

interface Tag {
    text: string,
    color?: string,
    textColor?: string,
}