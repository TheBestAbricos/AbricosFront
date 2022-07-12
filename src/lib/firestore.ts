import * as fs from 'firebase/firestore';
import * as fb from '$lib/firebase';
import type { Card, TagType } from './types/card';
import type { Folder } from './types/folder';
import type { FirestoreUser } from './types/user';

function getUserCollection(): fs.CollectionReference {
	return fs.collection(fb.firestore, 'users');
}
function getUserDocument(): fs.DocumentReference {
	return fs.doc(getUserCollection(), fb.getCurrentUser().uid);
}

function getFolderCollection(): fs.CollectionReference {
	return fs.collection(getUserCollection(), fb.getCurrentUser().uid, 'folders');
}
export async function getCurrentUserInfo(): Promise<FirestoreUser> {
	return (
		await fs.getDoc(fs.doc(getUserCollection(), fb.getCurrentUser().uid))
	).data() as FirestoreUser;
}

async function getCurrentFolderId(): Promise<string> {
	return (await getCurrentUserInfo()).currentFolder;
}
async function getItemsCollection(): Promise<fs.CollectionReference> {
	return fs.collection(getFolderCollection(), await getCurrentFolderId(), 'items');
}
async function getSpecificItemsCollection(folderId: string): Promise<fs.CollectionReference> {
	return fs.collection(getFolderCollection(), folderId, 'items');
}

export async function getCardsInCurrentFolder(): Promise<Card[] | undefined> {
	if ((await getCurrentFolderId()) === '') return undefined;

	const snapshot = await fs.getDocs(fs.query(await getItemsCollection()));
	const cards = snapshot.docs.map((e) => e.data() as Card);

	return cards.sort((a: Card, b: Card) => {
		if (!a.date) {
			return 1;
		}
		if (!b.date) {
			return -1;
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
	fs.updateDoc(fs.doc(await getItemsCollection(), docId), { checked });
}
export async function updateCardInFolder(
	card: Card,
	folderId: string | undefined = undefined,
): Promise<string> {
	let itemsCollection: fs.CollectionReference<fs.DocumentData>;
	if (folderId) {
		itemsCollection = fs.collection(getFolderCollection(), folderId, 'items');
	} else {
		itemsCollection = await getItemsCollection();
	}
	const newCard = card;
	let newDoc: fs.DocumentReference;
	if (newCard.docId) {
		newDoc = fs.doc(itemsCollection, newCard.docId);
	} else {
		newDoc = fs.doc(itemsCollection);
		newCard.docId = newDoc.id;
	}
	fs.setDoc(newDoc, newCard, { merge: true });
	return newCard.docId;
}
export async function getAllUserFolders(): Promise<Folder[]> {
	const foldersDocs = await fs.getDocs(fs.query(getFolderCollection(), fs.orderBy('creationDate')));
	return foldersDocs.docs.map((e) => e.data() as Folder);
}

export async function getAllUserCards(): Promise<Card[]> {
	const folders = await getAllUserFolders();
	let cards: Card[] = [];
	folders.forEach(async (folder) => {
		if (folder.docId) {
			const snapshot = await fs.getDocs(fs.query(await getSpecificItemsCollection(folder.docId)));
			const folderCards = snapshot.docs.map((e) => e.data() as Card);
			cards = [...cards, ...folderCards];
		}
	});
	return cards;
}
export async function deleteCard(docId: string): Promise<void> {
	fs.deleteDoc(fs.doc(await getItemsCollection(), docId));
}
export async function getCardByDocId(docId: string): Promise<Card> {
	return (await fs.getDoc(fs.doc(await getItemsCollection(), docId))).data() as Card;
}
export async function updateFolder(folder: Folder): Promise<string> {
	const newFolder = folder;
	if (!newFolder.docId) {
		newFolder.creationDate = fs.Timestamp.fromMillis(Date.now());
		const folderDoc = fs.doc(getFolderCollection());
		newFolder.docId = folderDoc.id;
		await fs.setDoc(folderDoc, newFolder, { merge: true });
		return newFolder.docId;
	}

	const folderDoc = fs.doc(getFolderCollection(), newFolder.docId);
	await fs.setDoc(folderDoc, newFolder, { merge: true });
	return newFolder.docId;
}
export async function setNotificationToken(token?: string): Promise<void> {
	const userDoc = getUserDocument();
	if (token) {
		await fs.updateDoc(userDoc, { token });
	} else {
		await fs.updateDoc(userDoc, { token: fs.deleteField() });
	}
}
export async function getNotificationToken(): Promise<string | undefined> {
	const userDoc = getUserDocument();
	const data = (await fs.getDoc(userDoc)).data() as FirestoreUser;
	return data.token;
}
export async function switchFolder(docId: string): Promise<void> {
	const userDoc = fs.doc(fs.collection(fb.firestore, 'users'), fb.getCurrentUser().uid);
	fs.updateDoc(userDoc, { currentFolder: docId });
}
export async function deleteFolder(docId: string): Promise<void> {
	const docs = await fs.getDocs(fs.query(await getItemsCollection()));
	docs.docs.forEach((e) => {
		deleteCard(e.id);
	});
	fs.deleteDoc(fs.doc(getFolderCollection(), docId));

	fs.updateDoc(getUserDocument(), { currentFolder: '' });
}
export async function addTag(tag: TagType): Promise<void> {
	const userDoc = getUserDocument();
	const user = await getCurrentUserInfo();
	const { tags } = user;
	tags.push(tag);
	await fs.updateDoc(userDoc, { tags });
}
export async function removeTag(tag: TagType): Promise<void> {
	const userDoc = getUserDocument();
	const user = await getCurrentUserInfo();
	let { tags } = user;
	tags = tags.filter((value: TagType) => value.text !== tag.text);
	await fs.updateDoc(userDoc, { tags });
}
export async function changeCardLocation(cardDocId: string, newFolderDocId: string): Promise<void> {
	const card = await getCardByDocId(cardDocId);
	if (!card.docId) return;

	await deleteCard(card.docId);

	card.docId = undefined;

	await updateCardInFolder(card, newFolderDocId);
}
export async function setAvatarUrl(url: string): Promise<void> {
	const userDoc = getUserDocument();
	await fs.setDoc(userDoc, { avatar: url }, { merge: true });
}
export async function getAvatarUrl(): Promise<string> {
	return (await getCurrentUserInfo()).avatar;
}
