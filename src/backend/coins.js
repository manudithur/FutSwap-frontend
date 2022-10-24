import {getFirestore} from 'firebase/firestore';
import {validateUserID} from '@/backend/validation';
import {getFunctions, httpsCallable} from 'firebase/functions';

/* Get the amount of coins of a user
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function getUserCoinsAsync(uid) {
    uid = validateUserID(uid);
    const db = getFirestore();
    const c = await db.collection('coins').doc(uid).get();
    return c.exists ? c.data().amount : 0;
}

/* Realize checkout of futcoins, should use the string returned to call to mercadopago.checkout
 * and render the checkout page.
 * @param {number} coins
 * @returns {Promise<string>}
 */
export async function checkoutFutcoinsAsync(quantity) {
    const functions = getFunctions();
    const create_preference = httpsCallable(functions, 'create_preference');
    try {
        const result = await create_preference({quantity: quantity});
        return result.data.id;
    } catch (e) {
        console.log(e);
    }
}

