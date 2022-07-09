// eslint-disable-next-line import/no-unresolved, import/extensions
import { getNotificationToken } from "./firestore";


const urlServer = 'https://a321-188-130-155-167.eu.ngrok.io/';



export async function deleteNotification(docId: string, oldDescription: string) {
	const token: string | undefined = await getNotificationToken();

	console.log(token);

	if (token) {
		const deleteData = {
			name: oldDescription,
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
		const time = `${datetime}:00`;
		console.log(time);
		const updateData = {
			time,
			id: docId,
			name: description,
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

export async function updateNotification(
	datetime: string,
	docId: string,
	description: string,
	oldDescription: string
) {
	deleteNotification(docId, oldDescription);
	setNotification(datetime, docId, description);
}