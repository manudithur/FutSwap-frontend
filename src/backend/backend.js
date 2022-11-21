import {getFirestore, getFunctions} from "@/backend/fireGetters";
import {collection, query, where, getDocs, orderBy, limit} from 'firebase/firestore';
import {validateUserID} from "@/backend/validation";

/*
 * Gets active market posts, limited by limitNum, ordered by creation date. If limitNum is null, it gets all the posts
 * @param {string} uid
 * @param {number} limitNum
 * @returns {Promise<{ figus: string[], price: number, bought: timestamp, created: timestamp, closed: timestamp, seller: string }[]>}
 */
export async function getActiveMarketPosts(uid, limitNum) {
    validateUserID(uid);

    const db = getFirestore();
    var q;

    if (limitNum == null)
        q = query(collection(db, 'market-active'), where('seller', '!=', uid), orderBy('created', 'desc'));
    else
        q = query(collection(db, 'market-active'), where('seller', '!=', uid), orderBy('created', 'desc'), limit(limitNum));


    const querySnapshot = await getDocs(q);
    var array = [];
    querySnapshot.forEach((doc) => {
        array.push(doc.data());
    });
    return array;
}

/*
 * Gets all inactive market posts sold by uid, ordered by creation date.
 * @param {string} uid
 * @returns {Promise<{
 *              figus: string[],
 *              price: number,
 *              bought: timestamp,
 *              created: timestamp,
 *              closed: timestamp,
 *              buyer: string,
 *              comment: string,
 *              seller: string[]}>}
 */
export async function getInactiveSoldBy(uid) {
    validateUserID(uid);
    const db = getFirestore();
    const q = query(collection(db, 'market-closed'), where('seller', '==', uid), orderBy('closed', 'desc'));

    const querySnapshot = await getDocs(q);
    var array = [];
    querySnapshot.forEach((doc) => {
        array.push(doc.data());
    })
    return array;
}

/*
 * Gets all inactive market posts bought by uid, ordered by creation date.
 * @param {string} uid
 * @returns {Promise<{
 *              figus: string[],
 *              price: number,
 *              bought: timestamp,
 *              created: timestamp,
 *              closed: timestamp,
 *              buyer: string,
 *              comment: string,
 *              seller: string }[]>}
 */
export async function getInactiveBoughtBy(uid) {
    validateUserID(uid);
    const db = getFirestore();
    const q = query(collection(db, 'market-closed'), where('buyer', '==', uid), orderBy('closed', 'desc'));

    const querySnapshot = await getDocs(q);
    var array = [];
    querySnapshot.forEach((doc) => {
        array.push(doc.data());
    });
    return array;
}

/**
 * Deletes market post with corresponding id.
 * @param {string} postID
 * @returns {Promise<void>}
 */
export async function deleteMarketPost(postID) {
    const functions = getFunctions();

    const deletePost = functions.httpsCallable('deleteMarketPost');
    deletePost({
        postId: postID
    })
}

/**
 * Creates market post with price, figus and amount. If amount for a figu is not present, assumes 1
 * Returns postId of new post
 * @param {number} price
 * @param {string[]} figus
 * @param {number[]} amounts
 * @returns {Promise<string>}
 */
export async function createMarketPost(price, figus, amounts) {
    const functions = getFunctions();

    const createPost = functions.httpsCallable('createMarketPost');
    createPost({
        price: price,
        figus: figus,
        amounts: amounts
    })
}

/**
 * Modifies an existing market post. If amount for a figu is not present, assumes 1
 * @param {string} postID
 * @param {number} price
 * @param {string[]} figus
 * @param {number[]} amounts
 * @returns {Promise<void>}
 */
export async function updateMarketPost(postID, price, figus, amounts) {
    const functions = getFunctions();

    const updatePost = functions.httpsCallable('updateMarketPost');
    updatePost({
        postId: postID,
        price: price,
        figus: figus,
        amounts: amounts
    })
}

/**
 * Buys a market post. In case of invalid data, throws an error
 * like this https://medium.com/geekculture/how-to-pass-errors-nicely-to-front-end-with-firebase-cloud-functions-6f224072eae4
 * @param {string} postId
 * @return {Promise<void>}
 */
export async function buyMarketPost(postId) {
    const functions = getFunctions();

    const buyPost = functions.httpsCallable('buyMarketPost');
    buyPost({
        postId: postId
    })
}
