import  { validateAlbum, validateFiguCode, validateUserID } from "./validation.js";
import { getFirestore, doc, collection, addDoc,  setDoc, getDocs} from '@firebase/firestore';


/*
Crea un swap activo de un sender a receiver
 */
export async function createActiveSwapAsync(album, uidSender, figuCodeSender, uidReceiver, figuCodeReceiver){
    album = validateAlbum(album);
    uidSender = validateUserID(uidSender);
    figuCodeSender = validateFiguCode(figuCodeSender);
    uidReceiver = validateUserID(uidReceiver);
    figuCodeReceiver = validateFiguCode(figuCodeReceiver);

    const db = getFirestore();

    let ret = await  addDoc(collection(db, 'swaps/activos/qatar2022' ), {
        uidSender: uidSender,
        figuCodeSender: figuCodeSender,
        uidReceiver: uidReceiver,
        figuCodeReceiver: figuCodeReceiver
    });

    // Adds the swap id the index of the users
    await setDoc(doc(db, 'swaps/user-swaps/' + album + '/activos/' + uidSender , ret.id), {
        sending: true,
    });

    await setDoc(doc(db, 'swaps/user-swaps/' + album + '/activos/' + uidReceiver , ret.id), {
        sending: false,
    });

    return ret;
}


/*
Crea un swap inactivo de un sender a receiver
 */
export async function createSwapInactiveAsync(album, uidSender, figuCodeSender, uidReceiver, figuCodeReceiver){
    album = validateAlbum(album);
    uidSender = validateUserID(uidSender);
    figuCodeSender = validateFiguCode(figuCodeSender);
    uidReceiver = validateUserID(uidReceiver);
    figuCodeReceiver = validateFiguCode(figuCodeReceiver);

    const db = getFirestore();

    let ret = await addDoc(collection(db, 'swaps/inactivos/' + album ), {
        uidSender: uidSender,
        figuCodeSender: figuCodeSender,
        uidReceiver: uidReceiver,
        figuCodeReceiver: figuCodeReceiver
    });


    // Adds the swap id the index of the users
    await setDoc(doc(db, 'swaps/user-swaps/' + album + '/inactivos/' + uidSender , ret.id), {
        sending: true,
    });

    await setDoc(doc(db, 'swaps/user-swaps/' + album + '/inactivos/' + uidReceiver , ret.id), {
        sending: false,
    });

    return ret;
}

/*
Retorna los swaps activos de un user
 */

export async function getUserActiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = await collection(db, 'swaps/user-swaps/' + album + '/activos/' + uid);
    const snapshot = await getDocs(c);

    let activeSwaps = [];
    snapshot.forEach((d) => activeSwaps.push(d.id));
    return activeSwaps;
}

/*
Retorna los swaps activos de un user
 */

export async function getUserInactiveSwapsAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = await collection(db, 'swaps/user-swaps/' + album + '/inactivos/' + uid);
    const snapshot = await getDocs(c);

    let activeSwaps = [];
    snapshot.forEach((d) => activeSwaps.push(d.id));
    return activeSwaps;
}

/*
Deletes swap-activos


async function deleteActiveSwap( album, swapID ){
    swapID.trim();
    const db = getFirestore();

    let d = await doc(db,'swaps/swaps-activos/' + album ,  swapID );

    let data = await getDoc(d);
    console.log(data);

    await deleteDoc(d);
}
*/



