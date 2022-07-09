import { getNotificationToken } from '$lib/firestore';

const url_server = 'https://a321-188-130-155-167.eu.ngrok.io/';

export async function updateNotification(
	datetime: number,
	docId: string,
	description: string,
	oldDescription: string
) {
	deleteNotification(docId, oldDescription);
	updateNotification(datetime, docId, description, oldDescription);
}

export async function deleteNotification(docId: string, oldDescription: string) {
	const token: string | undefined = await getNotificationToken();

	console.log(token);

	if (token) {
		const deleteData = {
			name: oldDescription,
			token: parseInt(token),
			id: docId
		};
		let res = await fetch(url_server + 'webhooks/deleteSchedule/', {
			method: 'DELETE',
			body: JSON.stringify(deleteData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res.status);
	}
}

export async function setNotification(datetime: number, docId: string, description: string) {
	const token: string | undefined = await getNotificationToken();

	console.log(token);

	if (token) {
		const date = new Date(datetime);
		const time = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		const updateData = {
			time: time,
			id: docId,
			name: description,
			token: parseInt(token)
		};

		let res = await fetch(url_server + 'webhooks/schedule/', {
			method: 'POST',
			body: JSON.stringify(updateData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res.status);
	}
}
