import type { Timestamp } from 'firebase/firestore';

export interface Folder {
	docId?: string;
	title: string;
	creationDate?: Timestamp;
	color?: string;
	textColor?: string;
}
