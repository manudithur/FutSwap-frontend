import {validateAlbum,  validateUserID} from "./validation.js";
import {getFirestore,  collection, getDocs, query, where} from '@firebase/firestore';
import {getCurrentUser} from "./users.js";
import {getFunctions} from "./fireGetters.js";
import {httpsCallable} from 'firebase/functions';

/**
 * Represents a swap.
 * @typedef {Object} Swap
 * @property {string} id This swap's identification code.
 * @property {string} status This swap's status. Either "pending", "accepted", or "inactive".
 * @property {string} uidSender The uid of the user that sent this swap offer.
 * @property {string} uidReceiver The uid of the user that received this swap offer.
 * @property {string[]} figuCodesReceiver An array with the figuCodes of the figuritas the receiver will give.
 * @property {string} status Represents in which state of the swapping process this swap is in ("PROPOSED", "ACCEPTED", "TIMED OUT: PROPOSED", "TIMED OUT: ACCEPTED")
 * @property {int} rating Value from 0 to 10 that respresents the rating
 * @property {int} date Value that represents the date its exact to one milisecond (its the exact amount of miliseconds since the Linux Epoch).
 *                      To convert it to a recongnizable date use Date(date)
 */


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

/**
 * Creates an active swap
 * @param {string} album
 * @param {string} uidReceiver
 * @param {string[]} figuCodesSender
 * @param {string[]} figuCodesReceiver
 */

export async function createActiveSwap(album, uidReceiver, figuCodesReceiver, figuCodesSender){
    const uidSender = getCurrentUser().uid;
    const data = {
        "album": album,
        "uidSender" : uidSender,
        "uidReceiver": uidReceiver,
        "figuCodesReceiver" : figuCodesReceiver,
        "figuCodesSender": figuCodesSender
    }

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'createActiveSwap');

    await functionCallable(data);
}

/**
 * Accepts an active swap
 * @param {string} album
 * @param {string} swapId
 */

export async function acceptSwap(album, swapId){
    const data = {
        "album": album,
        "swapId": swapId,
    }

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'acceptSwap');

    await functionCallable(data);
}

/**
 * Rejects an active swap
 * @param {string} album
 * @param {string} swapId
 */
export async function rejectSwap(album, swapId){
    const data = {
        "album": album,
        "swapId": swapId,
    }

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'rejectSwap');

    await functionCallable(data);
}

/**
 * Modifes a rating
 * @param {string} album
 * @param {string} swapId
 * @param {int} rating
 */
export async function modifyRating(album, swapId, rating){
    const data = {
        "album": album,
        "swapId": swapId,
        "rating": rating,
    }

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'modifyRating');

    await functionCallable(data);
}



