import type { Timestamp } from "firebase/firestore";

export interface Card {
    text: string,
    tags: Tag[],
    date?: Timestamp,
    checked: boolean,
}


interface Tag {
    text: string,
    color?: string,
    textColor?: string,
}