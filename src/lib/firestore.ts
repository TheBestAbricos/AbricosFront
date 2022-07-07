import * as fb from "$lib/firebase"
import * as fs from "firebase/firestore"; 
import { query } from "firebase/firestore";
import type {Card}  from "./types/card";


export async function getCardsByFolderName(folderName: string) : Promise<Card[]> {
    const itemsCollection = fs.collection(fb.firestore, 'users',
        (await fb.getCurrentUser()).uid, "folders", folderName, "items");
    
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