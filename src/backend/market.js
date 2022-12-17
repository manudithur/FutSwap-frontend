import {getFirestore, getFunctions} from "@/backend/fireGetters";
import {collection, getDocs, doc, getDoc, limit, orderBy, query, where} from 'firebase/firestore';
import {httpsCallable} from "firebase/functions";
import {validateUserID} from "@/backend/validation";


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
 * @param {number} limitNum
 * @returns {Promise<ActiveMarketPost[]>}
 */
export async function getActiveMarketPosts(limitNum) {
    const db = getFirestore();
    let q;

    if (limitNum == null)
        q = query(collection(db, 'market-active'), orderBy('created', 'desc'));
    else
        q = query(collection(db, 'market-active'), orderBy('created', 'desc'), limit(limitNum));

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
    uid = validateUserID(uid);
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

export async function getPendingMarketPostAsync(postId) {
    const db = getFirestore();
    const d = doc(db, 'market-pending/' + postId);
    const snapshot = await getDoc(d);
    let post = snapshot.data();
    if (!post)
        return null;

    post.postId = d.id;
    return post;
}

/*
 * Gets all inactive market posts bought by uid, ordered by creation date.
 * @param {string} uid
 * @returns {Promise<InactiveMarketPost[]>}
 */
export async function getInactiveMarketPostsBoughtBy(uid) {
    uid = validateUserID(uid);
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
    const functions = getFunctions();

    const deletePost = httpsCallable(functions, 'deleteMarketPost');
    const result = await deletePost({postId: postID});
    return result.data;
}

/**
 * Creates market post with price, figus and amount. If amount for a figu is not present, assumes 1
 * @param {number} price
 * @param {string[]} figus
 * @param {number[]} amounts
 * @returns {Promise<string>} Returns postId of new post
 */
export async function createMarketPost(price, figus, amounts) {
    const functions = getFunctions();

    const createPost = httpsCallable(functions, 'createMarketPost');
    const result = await createPost({
        price: price,
        figus: figus,
        amounts: amounts
    });
    return result.data;
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
    const functions = getFunctions();

    const updatePost = httpsCallable(functions, 'updateMarketPost');
    const result = await updatePost({
        postId: postID,
        price: price,
        figus: figus,
        amounts: amounts
    });
    return result.data;
}

/**
 * Buys a market post. In case of invalid data, throws an error.
 * like this https://medium.com/geekculture/how-to-pass-errors-nicely-to-front-end-with-firebase-cloud-functions-6f224072eae4
 * @param {string} postId
 * @return {Promise<void>}
 */
export async function buyMarketPost(postId) {
    const functions = getFunctions();

    const buyPost = httpsCallable(functions, 'buyMarketPost');
    const result = await buyPost({postId: postId});
    return result.data;
}

/**
 * Marks a market post as confirmed, either by the buyer or seller, depending on the uid.
 * If uid is neither, throws error.
 * @param {string} uid
 * @param {string} postId
 * @returns {Promise<void>}
 */
export async function markMarketPostAsReceived(uid, postId) {
    const functions = getFunctions();

    const markPost = httpsCallable(functions, 'markMarketPostAsReceived');
    const result = await markPost({postId: postId});
    return result.data;
}

/**
 * Marks a market post as in revision.
 * Throws error if not found or if uid is not buyer or seller.
 * @param {string} postId
 * @returns {Promise<void>}
 */
export async function markMarketPostAsInRevision(postId) {
    const functions = getFunctions();

    const markPost = httpsCallable(functions, 'setMarketPostInRevision');
    const result = await markPost({postId: postId});
    return result.data;
}
