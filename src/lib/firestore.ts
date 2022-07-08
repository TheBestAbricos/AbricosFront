import * as fb from "$lib/firebase"
import * as fs from "firebase/firestore"; 
import { query } from "firebase/firestore";
import type {Card}  from "./types/card";


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
        console.log(cards);
    });
    return cards;
}
export async function addCardInFolder(folderName: string, card: Card) : Promise<void> {
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", folderName, "items");
    fs.addDoc(itemsCollection, card);
}
