import type { TagType } from "./card";

export interface FirestoreUser {
    UID: string,
    email: string,
    firstName?: string,
    lastName?: string,
    tags: TagType[]
}


