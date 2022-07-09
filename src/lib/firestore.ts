import * as fs from "firebase/firestore";
import * as fb from "$lib/firebase"
import type { Card, TagType } from "./types/card";
import type { Folder } from "./types/folder";
import type { FirestoreUser } from "./types/user";


async function getCurrentFolderId(): Promise<string> {
    return (await getCurrentUserInfo()).currentFolder;
}

function getUserCollection(): fs.CollectionReference {
    return fs.collection(fb.firestore, "users");
}
function getUserDocument(): fs.DocumentReference {
    return fs.doc(getUserCollection(), fb.getCurrentUser().uid);
}

function getFolderCollection(): fs.CollectionReference {
    return fs.collection(
        getUserCollection(), fb.getCurrentUser().uid, "folders"
    );
}
async function getItemsCollection(): Promise<fs.CollectionReference> {
    return fs.collection(
        getFolderCollection(), await getCurrentFolderId(), "items"
    );
}


export async function getCurrentUserInfo(): Promise<FirestoreUser> {
    return (
        await fs.getDoc(
            fs.doc(
                    getUserCollection(),
                    fb.getCurrentUser().uid
                )
            )
    ).data() as FirestoreUser;
}

export async function getCardsInCurrentFolder(): Promise<Card[] | undefined> {

    if (await getCurrentFolderId() == "") return undefined;

    const snapshot = await fs.getDocs(
        fs.query(await getItemsCollection())
    );
    const cards = snapshot.docs.map((e) => e.data() as Card);

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

    fs.updateDoc(
        fs.doc(await getItemsCollection(), docId),
        { checked }
    );
}
export async function updateCardInFolder(card: Card, folderId: string | undefined = undefined): Promise<string> {
    let itemsCollection: fs.CollectionReference<fs.DocumentData>;
    if(folderId) {
        itemsCollection = fs.collection(getFolderCollection(), folderId, "items");
    }
    else {
        itemsCollection = await getItemsCollection();
    }

    let newDoc: fs.DocumentReference;
    if (card.docId) {
        newDoc = fs.doc(itemsCollection, card.docId);
    }
    else {
        newDoc = fs.doc(itemsCollection);
        card.docId = newDoc.id;
    }
    fs.setDoc(newDoc, card, { merge: true });
    return card.docId;

}
export async function getAllUserFolders(): Promise<Folder[]> {

    const foldersDocs = await fs.getDocs(
        fs.query(getFolderCollection(), fs.orderBy("creationDate"))
    );
    return foldersDocs.docs.map((e) => (e.data() as Folder)) as Folder[];
}
export async function deleteCard(docId: string): Promise<void> {
    fs.deleteDoc(
        fs.doc(await getItemsCollection(), docId)
    );
}
export async function getCardByDocId(docId: string): Promise<Card> {
    return (await fs.getDoc(
        fs.doc(await getItemsCollection(), docId)
    )).data() as Card;
}
export async function updateFolder(folder: Folder): Promise<string> {
    if (!folder.docId) {
        folder.creationDate = fs.Timestamp.fromMillis(Date.now());
        const folderDoc = fs.doc(getFolderCollection());
        folder.docId = folderDoc.id;
        await fs.setDoc(folderDoc, folder, { merge: true });
        return folder.docId;
    }

    const folderDoc = fs.doc(getFolderCollection(), folder.docId);
    await fs.setDoc(folderDoc, folder, { merge: true });
    return folder.docId as string;

}
export async function setNotificationToken(token?: string): Promise<void> {
    const userDoc = getUserDocument();
    if(token){
        await fs.updateDoc(userDoc, { token });
    }
    else {
        await fs.updateDoc(userDoc, { token: fs.deleteField() });
    }
}
export async function getNotificationToken(): Promise<string | undefined> {
    const userCollection = fs.collection(fb.firestore, 'users');
    const userDoc = getUserDocument()
    const data = (await fs.getDoc(userDoc)).data() as FirestoreUser;
    return data.token;
}
export async function switchFolder(docId: string): Promise<void> {
    const userDoc = fs.doc(fs.collection(fb.firestore, 'users'), fb.getCurrentUser().uid);
    fs.updateDoc(userDoc, { currentFolder: docId });
}
export async function deleteFolder(docId: string): Promise<void> {
    const docs = await fs.getDocs(
        fs.query(await getItemsCollection())
    );
    docs.docs.forEach(e => {
        deleteCard(e.id);
    });
    fs.deleteDoc(fs.doc(getFolderCollection(), docId));

    fs.updateDoc(getUserDocument(), {currentFolder: ""});

}
export async function addTag(tag: TagType): Promise<void> {
    const userDoc = getUserDocument();
    const user = await getCurrentUserInfo();
    const tags = user.tags;
    tags.push(tag);
    await fs.updateDoc(userDoc, {tags});
}
export async function removeTag(tag: TagType): Promise<void> {
    const userDoc = getUserDocument();
    const user = await getCurrentUserInfo();
    let tags = user.tags;
    tags = tags.filter((value: TagType) => {
        return value.text != tag.text
    });
    await fs.updateDoc(userDoc, {tags});
}
export async function changeCardLocation(cardDocId: string, newFolderDocId: string): Promise<void> {
    const card = await getCardByDocId(cardDocId);
    if(!card.docId) return;

    const currentItemsCollection = await getItemsCollection();
    const newItemsCollection = fs.collection(getFolderCollection(), newFolderDocId, "items");
    
    await deleteCard(card.docId);

    card.docId = undefined;
    
    await updateCardInFolder(card, newFolderDocId);
}