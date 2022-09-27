import { getFirestore, doc, getDoc, setDoc, collection, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';
import { validateAlbum, validateFiguCode, validateUserID } from "@/backend/validation";

export async function ensureInventoryExists(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const albumPath = 'inventories/' + album;
    const albumDoc = doc(db, albumPath);
    const albumDocSnapshot = await getDoc(albumDoc);
    if (!albumDocSnapshot.exists())
        throw 'Unexistant album: ' + album;

    // "You cannot create empty collection, you have to create document inside."
    // https://stackoverflow.com/questions/47871288/how-to-create-collection-in-cloud-firestore-from-javascript
    // Solution: All inventories are initialized with one faltante and one ofertada.

    const faltantesPath = albumPath + '/fal-' + uid;
    const ofertadasPath = albumPath + '/oft-' + uid;

    const batch = writeBatch(db);
    let commitNeeded = false;

    const faltantesSnapshot = await getDocs(collection(db, faltantesPath));
    if (faltantesSnapshot.size === 0) {
        batch.set(doc(db, faltantesPath, 'arg01'), {}, {merge: true});
        commitNeeded = true;
    }

    const ofertadasSnapshot = await getDocs(collection(db, ofertadasPath));
    if (ofertadasSnapshot.size === 0) {
        batch.set(doc(db, ofertadasPath, 'arg02'), {count: 1}, {merge: true});
        commitNeeded = true;
    }

    if (commitNeeded)
        await batch.commit();
}

export async function getInventoryFaltantesAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/fal-' + uid);
    const colSnapshot = await getDocs(c);

    let figus = [];
    colSnapshot.forEach((d) => figus.push(d.id));

    return figus;
}

export async function getInventoryOfertadasAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/oft-' + uid);
    const colSnapshot = await getDocs(c);

    let figus = [];
    colSnapshot.forEach((d) => {
        let figu = d.data();
        figu.figuCode = d.id;
        figus.push(figu);
    });

    return figus;
}

export function removeInventoryFaltanteAsync(album, uid, figuCode) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const d = doc(db, 'inventories/' + album + '/fal-' + uid, figuCode);
    return deleteDoc(d);
}

export function addInventoryFaltanteAsync(album, uid, figuCode) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const d = doc(db, 'inventories/' + album + '/fal-' + uid, figuCode);
    return setDoc(d, {}, { merge: true });
}

export function removeInventoryOfertadaAsync(album, uid, figuCode) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const d = doc(db, 'inventories/' + album + '/oft-' + uid, figuCode);
    return deleteDoc(d);
}

export function addInventoryOfertadaAsync(album, uid, figuCode, count) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const d = doc(db, 'inventories/' + album + '/oft-' + uid, figuCode);
    return setDoc(d, { count: count }, { merge: true });
}