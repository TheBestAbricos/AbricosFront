import * as fs from "firebase/firestore";
import { deleteField, Timestamp } from "firebase/firestore";
import * as fb from "$lib/firebase"
import type { Card } from "./types/card";
import type { Folder } from "./types/folder";
import type { FirestoreUser } from "./types/user";


export async function getCurrentUserInfo(): Promise<FirestoreUser> {
    return (await fs.getDoc(fs.doc(fb.firestore, "users", fb.getCurrentUser().uid))).data() as FirestoreUser;
}

export async function getCardsInCurrentFolder(): Promise<Card[]> {

    const currentFolderId = (await getCurrentUserInfo()).currentFolder;

    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");

    const snapshot = await fs.getDocs(
        fs.query(itemsCollection)
    );
    const cards: Card[] = [];
    snapshot.docs.forEach((e) => {
        const document = e.data() as Card;
        cards.push(document);
    });
    return cards.sort((a: Card, b: Card) => {
        if (!a.date) {
            return 1;
        }
        if (!b.date) {
            return -1
        }
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        return 0;
    });
}
export async function changeChecked(docId: string, checked: boolean) {
    const currentFolderId = (await getCurrentUserInfo()).currentFolder;
    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");

    fs.updateDoc(fs.doc(itemsCollection, docId), { checked });
}
export async function updateCardInFolder(card: Card): Promise<void> {
    const currentFolderId = (await getCurrentUserInfo()).currentFolder;

    const itemsCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders",
        currentFolderId, "items");
    if (card.docId) {
        const newDoc = fs.doc(itemsCollection, card.docId);
        fs.setDoc(newDoc, card, { merge: true });
    }
    else {
        const newDoc = fs.doc(itemsCollection);
        card.docId = newDoc.id;
        fs.setDoc(newDoc, card, { merge: true });
    }

}
export async function getAllUserFolders(): Promise<Folder[]> {
    const foldersCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders");

    const foldersDocs = await fs.getDocs(
        fs.query(foldersCollection, fs.orderBy("creationDate"))
    );
    return foldersDocs.docs.map((e) => (e.data() as Folder)) as Folder[];
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
export async function updateFolder(folder: Folder): Promise<string> {
    const foldersCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders");
    if (!folder.docId) {
        folder.creationDate = Timestamp.fromMillis(Date.now());
        const folderDoc = fs.doc(foldersCollection);
        folder.docId = folderDoc.id;
        await fs.setDoc(folderDoc, folder, { merge: true });
        return folder.docId;
    }

    const folderDoc = fs.doc(foldersCollection, folder.docId);
    await fs.setDoc(folderDoc, folder, { merge: true });
    return folder.docId as string;


}
export async function setNotificationToken(token?: string): Promise<void> {
    const userCollection = fs.collection(fb.firestore, 'users');
    const userDoc = fs.doc(userCollection, fb.getCurrentUser().uid);
    if(token){
        await fs.updateDoc(userDoc, { token });
    }
    else {
        await fs.updateDoc(userDoc, { token: deleteField() });
    }
}
export async function getNotificationToken(): Promise<string | undefined> {
    const userCollection = fs.collection(fb.firestore, 'users');
    const userDoc = fs.doc(userCollection, fb.getCurrentUser().uid);
    const data = (await fs.getDoc(userDoc)).data() as FirestoreUser;
    return data.token;
}
export async function switchFolder(docId: string): Promise<void> {
    const userDoc = fs.doc(fs.collection(fb.firestore, 'users'), fb.getCurrentUser().uid);
    fs.updateDoc(userDoc, { currentFolder: docId });
}
export async function deleteFolder(docId: string): Promise<void> {
    const foldersCollection = fs.collection(fb.firestore, 'users', fb.getCurrentUser().uid, "folders");
    fs.deleteDoc(fs.doc(foldersCollection, docId));
}