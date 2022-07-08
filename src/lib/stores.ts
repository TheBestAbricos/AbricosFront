import { writable } from 'svelte/store';
export const openedPanel = writable('initial');

export const amountTasks = writable(0);

export const noficationStatus = writable(false);

export const userToken = writable(0);
