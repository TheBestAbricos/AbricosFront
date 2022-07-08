import * as fb from "$lib/firebase"
import * as fs from "firebase/firestore"; 
import type {Card}  from "./types/card";
import type { Folder } from "./types/folder";
import type { FirestoreUser } from "./types/user";

export async function getCurrentUserInfo() : Promise<FirestoreUser> {
    return (await fs.getDoc(fs.doc(fb.firestore, "users", fb.getCurrentUser().uid))).data() as FirestoreUser;
}

export async function getCardsInCurrentFolder() : Promise<Card[]> {
    const uf = await getCurrentUserInfo();
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", uf.currentFolder, "items");
    
    const snapshot = await fs.getDocs(
        fs.query(itemsCollection)
    );
    const cards : Card[] = [];
    snapshot.docs.forEach((e) => {
        const document = e.data() as Card;
        cards.push(document);
    });
    return cards.sort((a: Card, b: Card) => {
        if(!a.date){
            return 1;
        }
        if(!b.date){
            return -1
        }
        if(a.date > b.date) {
            return 1;
        }
        if(a.date < b.date) {
            return -1;
        }
        else return 0;
    });
}
export async function addCardInFolder(folderName: string, card: Card) : Promise<void> {
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", folderName, "items");
    const newDoc = fs.doc(itemsCollection); 
    card.docId = newDoc.id;
    fs.setDoc(newDoc, card);
}
export async function getAllUserFolders() : Promise<Folder[]> {
    const foldersCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders");
    const foldersDocs = await fs.getDocs(foldersCollection);
    return foldersDocs.docs.map((e) => {
        return (e.data() as Folder);
    }) as Folder[];
}

export async function deleteCard(docId: string): Promise<void> {
    const uf = await getCurrentUserInfo();
    const itemsCollection = fs.collection(fb.firestore, 'users',
        fb.getCurrentUser().uid, "folders", uf.currentFolder, "items");
    fs.deleteDoc(fs.doc(itemsCollection, docId));
}
// todo: getCard by docId, change card, current folder, change folder title
