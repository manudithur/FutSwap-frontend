import { getFirestore, doc, setDoc} from '@firebase/firestore';
import { validateAlbum, validateFiguCode, validateUserID } from "./validation.js";


export async function createSwapAsync(album, uidSender, figuCodeSender, uidReceiver, figuCodeReceiver){
    album = validateAlbum(album);
    uidSender = validateUserID(uidSender);
    figuCodeSender = validateFiguCode(figuCodeSender);
    uidReceiver = validateUserID(uidReceiver);
    figuCodeReceiver = validateFiguCode(figuCodeReceiver);

    const db = getFirestore();


    return setDoc(doc(db, 'swaps-activos/' + album + '/' + uidSender, uidReceiver) , {
        figuCodeSender: figuCodeSender,
        figuCodeReceiver: figuCodeReceiver
    });


}