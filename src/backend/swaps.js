import {validateAlbum, validateFiguCode, validateUserID} from "./validation.js";
import {addDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore';
import {getCurrentUser} from "./users";

/**
 * Represents a swap.
 * @typedef {Object} Swap
 * @property {string} id This swap's identification code.
 * @property {string} status This swap's status. Either "pending", "accepted", or "inactive".
 * @property {string} uidSender The uid of the user that sent this swap offer.
 * @property {string} uidReceiver The uid of the user that received this swap offer.
 * @property {string[]} figuCodesReceiver An array with the figuCodes of the figuritas the receiver will give.
 * @property {string[]} figuCodesSender An array with the figuCodes of the figuritas the sender will give.
 */

/**
 * Creates an active swap, sent by the current user to another user.
 * @param {string} album
 * @param {string} uidReceiver
 * @param {string[]} figuCodesSender
 * @param {string[]} figuCodesReceiver
 * @returns {Promise<Swap>} The data of the created swap
 */
export async function createSwapAsync(album, uidReceiver, figuCodesSender, figuCodesReceiver) {
    album = validateAlbum(album);
    const uidSender = getCurrentUser().uid;
    uidReceiver = validateUserID(uidReceiver);
    if (!figuCodesSender || figuCodesSender.length === 0)
        throw 'Debe especificar al menos un figuCodeSender';
    if (!figuCodesReceiver || figuCodesReceiver.length === 0)
        throw 'Debe especificar al menos un figuCodeReceiver';
    for (let i = 0; i < figuCodesSender.length; i++)
        figuCodesSender[i] = validateFiguCode(figuCodesSender[i]);
    for (let i = 0; i < figuCodesReceiver.length; i++)
        figuCodesReceiver[i] = validateFiguCode(figuCodesReceiver[i]);

    let swapData = {
        uidSender: uidSender,
        uidReceiver: uidReceiver,
        figuCodesSender: figuCodesSender,
        figuCodesReceiver: figuCodesReceiver
    };

    const db = getFirestore();
    const col = collection(db, 'swaps/active/' + album);
    let newDocRef = await addDoc(col, swapData);
    swapData.id = newDocRef.id;
    return swapData;
}

/**
 * Gets the active swaps sent by a user.
 * @param {string} album
 * @param {string} uidSender
 * @returns {Promise<Swap[]>}
 */
export async function getUserSentActiveSwapsAsync(album, uidSender) {
    album = validateAlbum(album);
    uidSender = validateUserID(uidSender);

    const db = getFirestore();
    const col = collection(db, 'swaps/active/' + album);
    const senderQuery = query(col, where("uidSender", "==", uidSender));
    const snapshot = await getDocs(senderQuery);

    let activeSwaps = [];
    snapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}

/**
 * Gets the active swaps received by a user.
 * @param {string} album
 * @param {string} uidReceiver
 * @returns {Promise<Swap[]>}
 */
export async function getUserReceivedActiveSwapsAsync(album, uidReceiver) {
    album = validateAlbum(album);
    uidReceiver = validateUserID(uidReceiver);

    const db = getFirestore();
    const col = collection(db, 'swaps/active/' + album);
    const receiverQuery = query(col, where("uidReceiver", "==", uidReceiver));
    const snapshot = await getDocs(receiverQuery);

    let activeSwaps = [];
    snapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}

/**
 * Gets the active swaps received by a user.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<Swap[]>}
 */
export async function getUserAllActiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const col = collection(db, 'swaps/active/' + album);
    const senderQuery = query(col, where("uidSender", "==", uid));
    const receiverQuery = query(col, where("uidReceiver", "==", uid));
    const senderSnapshotPromise = getDocs(receiverQuery);
    const receiverSnapshotPromise = getDocs(senderQuery);
    const senderSnapshot = await senderSnapshotPromise;
    const receiverSnapshot = await receiverSnapshotPromise;

    let activeSwaps = [];
    senderSnapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    receiverSnapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}


/**
 * Gets the inactive swaps sent by a user.
 * @param {string} album
 * @param {string} uidSender
 * @returns {Promise<Swap[]>}
 */
export async function getUserSentInactiveSwapsAsync(album, uidSender) {
    album = validateAlbum(album);
    uidSender = validateUserID(uidSender);

    const db = getFirestore();
    const col = collection(db, 'swaps/inactive/' + album);
    const senderQuery = query(col, where("uidSender", "==", uidSender));
    const snapshot = await getDocs(senderQuery);

    let activeSwaps = [];
    snapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}

/**
 * Gets the inactive swaps received by a user.
 * @param {string} album
 * @param {string} uidReceiver
 * @returns {Promise<Swap[]>}
 */
export async function getUserReceivedInactiveSwapsAsync(album, uidReceiver) {
    album = validateAlbum(album);
    uidReceiver = validateUserID(uidReceiver);

    const db = getFirestore();
    const col = collection(db, 'swaps/inactive/' + album);
    const receiverQuery = query(col, where("uidReceiver", "==", uidReceiver));
    const snapshot = await getDocs(receiverQuery);

    let activeSwaps = [];
    snapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}

/**
 * Gets the inactive swaps received by a user.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<Swap[]>}
 */
export async function getUserAllInactiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const col = collection(db, 'swaps/inactive/' + album);
    const senderQuery = query(col, where("uidSender", "==", uid));
    const receiverQuery = query(col, where("uidReceiver", "==", uid));
    const senderSnapshotPromise = getDocs(receiverQuery);
    const receiverSnapshotPromise = getDocs(senderQuery);
    const senderSnapshot = await senderSnapshotPromise;
    const receiverSnapshot = await receiverSnapshotPromise;

    let activeSwaps = [];
    senderSnapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    receiverSnapshot.forEach((d) => {
        let s = d.data();
        s.id = d.id;
        activeSwaps.push(s);
    });
    return activeSwaps;
}

