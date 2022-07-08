import * as fb from "$lib/firebase"
import * as fs from "firebase/firestore"; 
import { query } from "firebase/firestore";
import type {Card}  from "./types/card";
import type { Folder } from "./types/folder";
import type { FirestoreUser } from "./types/user";

export async function getCurrentUserInfo() : Promise<FirestoreUser> {
    return (await fs.getDoc(fs.doc(fb.firestore, "users", fb.getCurrentUser().uid))).data() as FirestoreUser;
}

export async function getCardsByFolderName(folderName: string) : Promise<Card[]> {
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", folderName, "items");
    
    const snapshot = await fs.getDocs(
        query(itemsCollection)
    );
    const cards : Card[] = [];
    snapshot.docs.forEach((e) => {
        const document = e.data() as Card;
        cards.push(document);
    });
    return cards;
}
export async function addCardInFolder(folderName: string, card: Card) : Promise<void> {
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", folderName, "items");
    fs.addDoc(itemsCollection, card);
}
export async function getAllUserFolders() : Promise<Folder[]> {
    const foldersCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders");
    const foldersDocs = await fs.getDocs(foldersCollection);
    return foldersDocs.docs.map((e) => {
        return (e.data() as Folder);
    }) as Folder[];
}