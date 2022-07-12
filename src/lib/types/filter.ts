import type { Timestamp } from 'firebase/firestore';
import type { TagType } from './card';

export interface FilterData {
	till?: Timestamp;
	tags: TagType[];
	text?: string;
	completed?: boolean;
}
