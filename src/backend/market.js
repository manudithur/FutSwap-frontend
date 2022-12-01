import {getFirestore} from "@/backend/fireGetters";
import {collection, query, where, getDocs, orderBy, limit, doc} from 'firebase/firestore';
import {validateUserID} from "@/backend/validation";
import {httpsCallable} from "firebase/functions";

/**
 * Represents an active market post.
 * @typedef {Object} ActiveMarketPost
 * @property postId string
 * @property figus: string[],
 * @property price: number,
 * @property bought: timestamp,
 * @property created: timestamp,
 * @property closed: timestamp,
 * @property seller: string
 */

/**
 * Represents an inactive market post.
 * @typedef {Object} InactiveMarketPost
 * @property postId string
 * @property figus: string[],
 * @property price: number,
 * @property bought: timestamp,
 * @property created: timestamp,
 * @property closed: timestamp,
 * @property seller: string
 * @property buyer: (string | undefined),
 * @property comment: (string | undefined),
 */

/*
 * Gets active market posts, limited by limitNum, ordered by creation date. If limitNum is null, it gets all the posts.
 * @param {string} uid
 * @param {number} limitNum
 * @returns {Promise<ActiveMarketPost[]>}
 */
export async function getActiveMarketPosts(uid, limitNum) {
    validateUserID(uid);

    const db = getFirestore();
    let q;

    if (limitNum == null)
        q = query(collection(db, 'market-active'), where('seller', '!=', uid), orderBy('created', 'desc'));
    else
        q = query(collection(db, 'market-active'), where('seller', '!=', uid), orderBy('created', 'desc'), limit(limitNum));


    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.postId = doc.id;
        array.push(data);
    });
    return array;
}

/*
 * Gets all inactive market posts sold by uid, ordered by creation date.
 * @param {string} uid
 * @returns {Promise<InactiveMarketPost[]>}
 */
export async function getInactiveMarketPostsSoldBy(uid) {
    validateUserID(uid);
    const db = getFirestore();
    const q = query(collection(db, 'market-closed'), where('seller', '==', uid), orderBy('closed', 'desc'));

    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.postId = doc.id;
        array.push(data);
    })
    return array;
}

/*
 * Gets all inactive market posts bought by uid, ordered by creation date.
 * @param {string} uid
 * @returns {Promise<InactiveMarketPost[]>}
 */
export async function getInactiveMarketPostsBoughtBy(uid) {
    validateUserID(uid);
    const db = getFirestore();
    const q = query(collection(db, 'market-closed'), where('buyer', '==', uid), orderBy('closed', 'desc'));

    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.postId = doc.id;
        array.push(data);
    });
    return array;
}

/**
 * Deletes market post with corresponding id.
 * @param {string} postID
 * @returns {Promise<void>}
 */
export async function deleteMarketPost(postID) {

    const deletePost = httpsCallable('deleteMarketPost');
    deletePost({
        postId: postID
    })
}

/**
 * Creates market post with price, figus and amount. If amount for a figu is not present, assumes 1
 * @param {number} price
 * @param {string[]} figus
 * @param {number[]} amounts
 * @returns {Promise<string>} Returns postId of new post
 */
export async function createMarketPost(price, figus, amounts) {
    const createPost = httpsCallable('createMarketPost');
    return createPost({
        price: price,
        figus: figus,
        amounts: amounts
    })
}

/**
 * Modifies an existing market post. If amount for a figu is not present, assumes 1.
 * @param {string} postID
 * @param {number} price
 * @param {string[]} figus
 * @param {number[]} amounts
 * @returns {Promise<void>}
 */
export async function updateMarketPost(postID, price, figus, amounts) {
    const updatePost = httpsCallable('updateMarketPost');
    updatePost({
        postId: postID,
        price: price,
        figus: figus,
        amounts: amounts
    })
}

/**
 * Buys a market post. In case of invalid data, throws an error.
 * like this https://medium.com/geekculture/how-to-pass-errors-nicely-to-front-end-with-firebase-cloud-functions-6f224072eae4
 * @param {string} postId
 * @return {Promise<void>}
 */
export async function buyMarketPost(postId) {

    const buyPost = httpsCallable('buyMarketPost');
    buyPost({
        postId: postId
    })
}

/**
 * Marks a market post as confirmed, either by the buyer or seller, depending on the uid.
 * If uid is neither, throws error.
 * @param {string} uid
 * @param {string} postId
 * @returns {Promise<void>}
 */
export async function markMarketPostAsReceived(uid, postId) {
    const db = getFirestore()

    const docRef = doc(db, 'market-pending', postId);
    const post = await docRef.get();

    if (!post.exists())
        throw new Error('Post does not exist');

    if (post.data().buyer !== uid) {
        if (post.data().seller !== uid) {
            throw new Error("Not authorized")
        }
        await docRef.update({
            buyerConfirmed: true
        })
    } else {
        await docRef.update({
            vendorConfirmed: true
        })
    }
}

/**
 * Marks a market post as in revision.
 * Throws error if not found or if uid is not buyer or seller.
 * @param {string} postId
 * @returns {Promise<void>}
 */
export async function markMarketPostAsInRevision( postId) {
    const markPost = httpsCallable('setMarketPostInRevision');
    markPost({postId: postId});
}
