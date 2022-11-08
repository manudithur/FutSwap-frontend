import {getFirestore} from "@/backend/fireGetters";
import {collection, getDocs, query, where} from 'firebase/firestore';
import {getCurrentUser} from "./users";
import {countInventoryFaltantesAsync, getInventoryFaltantesAsync, getInventoryOfertadasAsync} from "./inventory";

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

export async function getSwapOffers(album) {
    const currentUser = getCurrentUser();
    const db = getFirestore();

    const faltantesTask = getInventoryFaltantesAsync(album, currentUser.uid);
    const ofertadasTask = getInventoryOfertadasAsync(album, currentUser.uid);
    const faltantes = await faltantesTask;
    const ofertadas = await ofertadasTask;

    let receiverUids = new Map();

    for (let i = 0; i < faltantes.length; i++) {
        const c = collection(db, 'inventories-figusorted/' + album + '/' + faltantes[i].figuCode);
        const q = query(c, where('status', '>', 0));
        const snapshot = await getDocs(q);
        snapshot.forEach((d) => {
            let receiver = receiverUids.get(d.id);
            if (!receiver) {
                receiver = {canGiveMe: []};
                receiverUids.set(d.id, receiver);
            }

            receiver.canGiveMe.push(faltantes[i].figuCode);
        });
    }

    const offers = [];
    for (const [uid, receiver] of receiverUids.entries()) {
        offers.push({
           uidSender: currentUser.uid,
            uidReceiver: uid,
            forYouCount: receiver.canGiveMe.length,
            searchingCount: await countInventoryFaltantesAsync(album, uid),
            figuCodesReceiver: receiver.canGiveMe,
            figuCodesSender: ofertadas
        });
    }

    return offers;
}