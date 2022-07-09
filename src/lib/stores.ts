import { writable } from 'svelte/store';

export const openedPanel = writable('initial');

export const amountTasks = writable(0);

export const noficationStatus = writable(false);

export const logoChoiceMode = writable(false); // not to store

export const logoSrc = writable('images/profile-images/user-default-logo.png');

export const droppedCard = writable('');
export const isDroppedCardScaled = writable(false);
