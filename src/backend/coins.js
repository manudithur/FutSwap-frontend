import { getFirestore } from 'firebase/firestore';
import { validateUserID } from '@/backend/validation';

/* Get the amount of coins of a user
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function getUserCoinsAsync(uid) {
    uid = validateUserID(uid);
    const db = getFirestore();
    const c = await db.collection('coins').doc(uid).get();
    return c.exists() ? c.data().amount : 0;
}

/* Add coins to the total amount of coins of a user
 * @param {string} uid
 * @param {number} coins
 */
export async function addUserCoinsAsync(uid, coins) {
    uid = validateUserID(uid);
    coins = parseInt(coins);
    const db = getFirestore();
    const c = await db.collection('coins').doc(uid);
    if (c.exists()) {
        await c.update({amount: c.data().amount + coins});
    } else {
        await c.set({amount: coins});
    }
}
