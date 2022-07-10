// eslint-disable-next-line import/no-unresolved, import/extensions
import { getAllUserCards, getNotificationToken, setNotificationToken } from '$lib/firestore';

export const urlServer = 'https://a321-188-130-155-167.eu.ngrok.io/';
// export const urlServer = 'https://5e8b-188-130-155-154.eu.ngrok.io/';

export async function deleteNotification(docId: string) {
	const token: string | undefined = await getNotificationToken();

	console.log(token);

	if (token) {
		const deleteData = {
			token: parseInt(token, 10),
			id: docId
		};
		const res = await fetch(`${urlServer}webhooks/deleteSchedule/`, {
			method: 'DELETE',
			body: JSON.stringify(deleteData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res.status);
	}
}

export async function setNotification(datetime: string, docId: string, description: string) {
	const token: string | undefined = await getNotificationToken();

	console.log(token);

	if (token) {
		const time = datetime;
		console.log(time);
		const updateData = {
			time,
			taskID: docId,
			description: description,
			token: parseInt(token, 10)
		};

		const res = await fetch(`${urlServer}webhooks/schedule/`, {
			method: 'POST',
			body: JSON.stringify(updateData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res.status);
	}
}

export const sendTokenToTgBot = async (token: string) => {
	// let token = token_input.value;
	let response = await fetch(`${urlServer}webhooks/verifyToken/${token}/`);

	if (!response.ok) {
		throw Error('Invalid token');
	}

	await setNotificationToken(token);

	const cards = await getAllUserCards();
	// console.log(cards);
	cards.forEach((card) => {
		if (card.date && card.docId) {
			let stringDate: string = new Date(card.date.seconds * 1000).toISOString();
			setNotification(stringDate, card.docId, card.text);
			console.log(card.docId, stringDate);
		}
	});
};

export const deleteTokenFromTgBot = async () => {
	let token = await getNotificationToken();

	let res = await fetch(`${urlServer}webhooks/unlinkTelegram/${token}`);
	// console.log(res);
};
