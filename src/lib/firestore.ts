import * as fb from "$lib/firebase"
import * as fs from "firebase/firestore"; 
import type {Card}  from "./types/card";
import type { Folder } from "./types/folder";
import type { FirestoreUser } from "./types/user";


export async function getCurrentUserInfo() : Promise<FirestoreUser> {
    return (await fs.getDoc(fs.doc(fb.firestore, "users", fb.getCurrentUser().uid))).data() as FirestoreUser;
}

export async function getCardsInCurrentFolder() : Promise<Card[]> {

    const currentFolderId = (await getCurrentUserInfo()).currentFolder;
    
    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");

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
export async function updateCardInFolder(folderName: string, card: Card) : Promise<void> {
    const currentFolderId = (await getCurrentUserInfo()).currentFolder;

    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");
    if(card.docId){
        const newDoc = fs.doc(itemsCollection, card.docId); 
        fs.setDoc(newDoc, card, {merge: true});
    }
    else {
        const newDoc = fs.doc(itemsCollection); 
        card.docId = newDoc.id;
        fs.setDoc(newDoc, card, {merge: true});
    }
    
}
export async function getAllUserFolders() : Promise<Folder[]> {
    const foldersCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders");

    const foldersDocs = await fs.getDocs(foldersCollection);
    return foldersDocs.docs.map((e) => {
        return (e.data() as Folder);
    }) as Folder[];
}

export async function deleteCard(docId: string): Promise<void> {

    const currentFolderId = (await getCurrentUserInfo()).currentFolder;
    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");

    fs.deleteDoc(fs.doc(itemsCollection, docId));
}

export async function getCardByDocId(docId: string): Promise<Card> {

    const currentFolderId = (await getCurrentUserInfo()).currentFolder;
    
    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");


    return await (await fs.getDoc(fs.doc(itemsCollection, docId))).data() as Card;
}

export async function changeFolderTitle(oldFolderTitle: string, newFolderTitle: string) {
    const foldersCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders");
    const foldersQuery = (await fs.getDocs(
        fs.query(foldersCollection, fs.where("title", "==", oldFolderTitle))
    ));
    if(foldersQuery.empty) return;
    const oldFolderId = foldersQuery.docs[0].id;
    const folderDoc = fs.doc(foldersCollection, oldFolderId);
    await fs.updateDoc(folderDoc, {title: newFolderTitle}); 
}
export async function setNotificationToken(token: string): Promise<void> {
    const userCollection = fs.collection(fb.firestore, 'users');
    const userDoc = fs.doc(userCollection, fb.getCurrentUser().uid);
    await fs.updateDoc(userDoc, {token: token});
}
export async function getNotificationToken(): Promise<string | undefined> {
    const userCollection = fs.collection(fb.firestore, 'users');
    const userDoc = fs.doc(userCollection, fb.getCurrentUser().uid);
    const data = (await fs.getDoc(userDoc)).data() as FirestoreUser;
    return data.telegramToken;
}