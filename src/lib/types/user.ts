import type { Tag } from "./card";

export interface FirestoreUser {
    UID: string,
    email: string,
    firstName?: string,
    lastName?: string,
    tags: Tag[]
}


