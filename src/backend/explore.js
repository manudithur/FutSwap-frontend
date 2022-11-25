import {getFunctions} from "@/backend/fireGetters";
import {httpsCallable} from "firebase/functions";

/**
 * Represents a swap offer.
 * @typedef {Object} SwapOffer
 * @property {string} uidSender The uid of the user that would send this swap offer.
 * @property {string} uidReceiver The uid of the user that would receive this swap offer.
 * @property {number} forYouCount The amount of figus the receiver has that the sender is looking for.
 * @property {number} searchingCount The amount of figus the receiver is looking for
 * @property {string[]} figuCodesReceiver An array with the figuCodes of ALL the figuritas the receiver could give.
 * @property {string[]} figuCodesSender An array with the figuCodes of ALL the figuritas the sender could give.
 */

/**
 * Gets possible swap offers for the active user.
 * @param album
 * @return {Promise<SwapOffer[]>}
 */
export async function getSwapOffers(album) {
    const functions = getFunctions();
    const functionCallable = httpsCallable(functions, 'getSwapOffers');

    const data = {
        album: album
    };

    const result = await functionCallable(data);
    let d = result.data;
    d.createDate = new Date(d.createDate);
    return d;
}