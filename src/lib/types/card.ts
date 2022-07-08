export interface Card {
    text: string,
    tags: TagType[],
    time?: string,
    date?: string,
    checked: boolean,
}

export interface TagType {
    text: string,
    color?: string,
    textColor?: string,
}