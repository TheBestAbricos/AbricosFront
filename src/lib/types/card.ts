import type { Timestamp } from 'firebase/firestore';

export interface TagType {
	text: string;
	color?: string;
	textColor?: string;
}
export interface Card {
	docId?: string;
	text: string;
	tags: TagType[];
	date?: Timestamp;
	checked: boolean;
}
