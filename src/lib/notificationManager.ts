import { getAllUserCards, getNotificationToken, setNotificationToken } from '$lib/firestore';

// export const urlServer = 'http://127.0.0.1:8000/';
// export const urlServer = 'https://852e-188-130-155-148.eu.ngrok.io/';
// export const urlServer = 'https://80e2-188-130-155-152.eu.ngrok.io/';
export const urlServer = 'https://34bf-188-130-155-152.eu.ngrok.io/';



export async function deleteNotification(docId: string) {
	const token: string | undefined = await getNotificationToken();

	if (token) {
		const deleteData = {
			token: parseInt(token, 10),
			id: docId,
		};
		await fetch(`${urlServer}webhooks/deleteSchedule/`, {
			method: 'DELETE',
			body: JSON.stringify(deleteData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// console.log(res.status);
	}
}

export async function setNotification(datetime: string, docId: string, description: string) {
	const token: string | undefined = await getNotificationToken();

	if (token) {
		const time = datetime;
		const updateData = {
			time,
			taskID: docId,
			description,
			token: parseInt(token, 10),
		};

		await fetch(`${urlServer}webhooks/schedule/`, {
			method: 'POST',
			body: JSON.stringify(updateData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// console.log(res.status);
	}
}

export const sendTokenToTgBot = async (token: string) => {
	const response = await fetch(`${urlServer}webhooks/verifyToken/${token}/`);
	
	if (!response.ok) {
		
		throw Error('Invalid token');
	}

	await setNotificationToken(token);

	const cards = await getAllUserCards();

	cards.forEach((card) => {
		const timeFromNow = card.date ? card.date.seconds * 1000 - Date.now() > 0 : undefined;
		if (timeFromNow && card.docId && card.date && !card.checked) {
			const stringDate: string = new Date(card.date.seconds * 1000).toISOString();
			setNotification(stringDate, card.docId, card.text);
			// console.log(card.docId, stringDate);
		}
	});
};

export const deleteTokenFromTgBot = async () => {
	const token = await getNotificationToken();

	await fetch(`${urlServer}webhooks/unlinkTelegram/${token}`);
	// console.log(res);
};
