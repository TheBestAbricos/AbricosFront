import type { Timestamp } from "firebase/firestore";

export interface Card {
    docId: string,
    text: string,
    tags: TagType[],
    time?: string,
    date?: string,
    checked: boolean,
}

export interface TagType {
    tags: Tag[],
    date?: Timestamp,
    checked: boolean,
}


interface Tag {
    text: string,
    color?: string,
    textColor?: string,
}