import {getFirestore} from './fireGetters';
import {doc, getDoc} from 'firebase/firestore'
import {validateUserID} from '@/backend/validation';

/**
 * Get the amount of coins of a user
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function getUserCoinsAsync(uid) {
    uid = validateUserID(uid);
    const db = getFirestore();
    const c = await getDoc(doc(db, 'coins/' + uid));
    return c.exists ? c.data().amount : 0;
}
