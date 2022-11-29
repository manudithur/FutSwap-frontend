import {validateAlbum, validateUserID} from "./validation.js";
import {getFirestore, getFunctions} from "@/backend/fireGetters";
import {collection, getDocs, query, where, getCountFromServer} from 'firebase/firestore';
import {httpsCallable} from "firebase/functions";
import {getCurrentUser} from "./users";

/**
 * Represents a swap.
 * @typedef {Object} Swap
 * @property {string} id This swap's identification code.
 * @property {string} status This swap's status. Either "PENDING" or "ACCEPTED".
 * @property {string} uidSender The uid of the user that sent this swap offer.
 * @property {string} uidReceiver The uid of the user that received this swap offer.
 * @property {string[]} figuCodesReceiver An array with the figuCodes of the figuritas the receiver will give.
 * @property {string[]} figuCodesSender An array with the figuCodes of the figuritas the sender will give.
 * @property {Date} createDate The time at which this swap was created.
 * @property {Date | undefined} acceptDate The time at which this swap was accepted.
 * @property {number | undefined} senderRating The rating the sender gave to the receiver on this swap.
 * @property {number | undefined} receiverRating The rating the receiver gave to the sender on this swap.
 */

function convertSwapFromDb(snapshot) {
    let swap = snapshot.data();
    swap.id = snapshot.id;
    if (swap.createDate)
        swap.createDate = swap.createDate.toDate();
    if (swap.acceptDate)
        swap.acceptDate = swap.acceptDate.toDate();
    return swap;
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
        activeSwaps.push(convertSwapFromDb(d));
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
        activeSwaps.push(convertSwapFromDb(d));
    });
    return activeSwaps;
}

/**
 * Gets the active swaps sent or received by a user.
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
        activeSwaps.push(convertSwapFromDb(d));
    });
    receiverSnapshot.forEach((d) => {
        activeSwaps.push(convertSwapFromDb(d));
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

    let inactiveSwaps = [];
    snapshot.forEach((d) => {
        inactiveSwaps.push(convertSwapFromDb(d));
    });
    return inactiveSwaps;
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

    let inactiveSwaps = [];
    snapshot.forEach((d) => {
        inactiveSwaps.push(convertSwapFromDb(d));
    });
    return inactiveSwaps;
}

/**
 * Gets the inactive swaps sent or received by a user.
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

    let inactiveSwaps = [];
    senderSnapshot.forEach((d) => {
        inactiveSwaps.push(convertSwapFromDb(d));
    });
    receiverSnapshot.forEach((d) => {
        inactiveSwaps.push(convertSwapFromDb(d));
    });
    return inactiveSwaps;
}

/**
 * Counts the inactive swaps sent or received by a user.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function countUserAllInactiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const col = collection(db, 'swaps/inactive/' + album);
    const senderQuery = query(col, where("uidSender", "==", uid));
    const receiverQuery = query(col, where("uidReceiver", "==", uid));
    const senderSnapshotPromise = getCountFromServer(receiverQuery);
    const receiverSnapshotPromise = getCountFromServer(senderQuery);
    const senderSnapshot = await senderSnapshotPromise;
    const receiverSnapshot = await receiverSnapshotPromise;

    return senderSnapshot.data().count + receiverSnapshot.data().count;
}

/**
 * Counts the active swaps sent or received by a user.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function countUserAllActiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const col = collection(db, 'swaps/active/' + album);
    const senderQuery = query(col, where("uidSender", "==", uid));
    const receiverQuery = query(col, where("uidReceiver", "==", uid));
    const senderSnapshotPromise = getCountFromServer(receiverQuery);
    const receiverSnapshotPromise = getCountFromServer(senderQuery);
    const senderSnapshot = await senderSnapshotPromise;
    const receiverSnapshot = await receiverSnapshotPromise;

    return senderSnapshot.data().count + receiverSnapshot.data().count;
}

/**
 * Creates an active swap, sent by the current user to another user.
 * @param {string} album
 * @param {string} uidReceiver
 * @param {string[]} figuCodesSender
 * @param {string[]} figuCodesReceiver
 * @returns {Promise<Swap>} The data of the created swap.
 */
export async function createSwapAsync(album, uidReceiver, figuCodesReceiver, figuCodesSender) {
    const uidSender = getCurrentUser().uid;
    const data = {
        "album": album,
        "uidSender" : uidSender,
        "uidReceiver": uidReceiver,
        "figuCodesReceiver" : figuCodesReceiver,
        "figuCodesSender": figuCodesSender
    };

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'createSwap');

    const result = await functionCallable(data);
    let d = result.data;
    d.createDate = new Date(d.createDate);
    return d;
}

/**
 * Accepts an active swap.
 * @param {string} album
 * @param {string} swapId
 * @return {Promise<void>} promesas vacías :(
 */
export async function acceptSwapAsync(album, swapId){
    const data = {
        "album": album,
        "swapId": swapId,
    };

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'acceptSwap');

    const result = await functionCallable(data);
    return result.data;
}

/**
 * Rejects an active swap.
 * @param {string} album
 * @param {string} swapId
 * @return {Promise<void>}
 */
export async function rejectSwapAsync(album, swapId){
    const data = {
        "album": album,
        "swapId": swapId,
    };

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'rejectSwap');

    const result = await functionCallable(data);
    return result.data;
}

/**
 * Sets the rating of a user on a swap. Either the sender or receiver of the swap must be
 * the currently signed-in user, and the rating will apply to the other user.
 * This will fail if the user has already rated on this swap.
 * @param {string} album
 * @param {string} swapId
 * @param {int} rating The rating to give the oth
 * @return {Promise<void>}
 */
export async function rateUserOnSwapAsync(album, swapId, rating){
    const data = {
        "album": album,
        "swapId": swapId,
        "rating": rating,
    };

    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'setRating');

    const result = await functionCallable(data);
    return result.data;
}