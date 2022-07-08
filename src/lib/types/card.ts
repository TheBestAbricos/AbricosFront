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
    text: string,
    date?: Timestamp,
    checked: boolean,
    color?: string,
    textColor?: string,
}
