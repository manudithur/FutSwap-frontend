import {getFirestore} from "@/backend/fireGetters";
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
 *              seller: string }[]>}
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
