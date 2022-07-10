import type { TagType } from "./card";

export interface FilterData {
    till?: Date;
    tags: TagType[];
    text?: string;
    completed?: boolean;
}