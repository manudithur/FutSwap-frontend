import {getFirestore} from "@/backend/fireGetters";
import {collection, deleteDoc, doc, getDoc, getDocs, limit, query, where, setDoc, writeBatch, getCountFromServer} from 'firebase/firestore';
import {validateAlbum, validateFiguCode, validateUserID} from "@/backend/validation";

// https://firebase.google.com/docs/firestore/manage-data/transactions
const FirestoreWritebatchLimit = 500;

async function performFiguQuery(q) {
    const colSnapshot = await getDocs(q);

    let figus = [];
    colSnapshot.forEach((d) => figus.push({figuCode: d.id, status: d.data().status}));
    return figus;

}

/**
 * Gets the status of a figurita in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @param {string} figuCode
 * @returns {Promise<{figuCode: string, status: number}>}
 */
export async function getInventoryFiguAsync(album, uid, figuCode) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const c = doc(db, 'inventories/' + album + '/' + uid, figuCode);
    const docSnapshot = await getDoc(c);

    return {
        figuCode: docSnapshot.id,
        status: docSnapshot.exists() ? docSnapshot.data().status : 0
    };
}

/**
 * Gets the status of all the figuritas in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<{ figuCode: string, status: number }[]>}
 */
export function getInventoryAllAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    return performFiguQuery(c);
}

/**
 * Gets the status of all the figuritas in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @param {{ figuCode: string, status: number }[]} result
 * @returns {Promise<void>}
 */
export async function getInventoryAllIntoAsync(album, uid, result) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    const colSnapshot = await getDocs(c);

    result.forEach((r) => r.status = 0);

    colSnapshot.forEach((d) => {
        const figu = result.find((e) => e.figuCode === d.id);
        if (figu) {
            figu.status = d.data().status;
        } else {
            result.push({figuCode: d.id, status: d.data().status});
        }
    });
}

/**
 * Sets the status of a single figurita in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @param {string} figuCode
 * @param {number} status
 * @returns {Promise<void>}
 */
export function setInventoryFiguAsync(album, uid, figuCode, status) {
    album = validateAlbum(album);
    uid = validateUserID(uid);
    figuCode = validateFiguCode(figuCode);
    status = parseInt(status);

    const db = getFirestore();
    const d = doc(db, 'inventories/' + album + '/' + uid, figuCode);

    if (status === 0)
        return deleteDoc(d);

    return setDoc(d, {status: status});
}

/**
 * Sets the status of multiple figuritas in a user's inventory at the same time.
 * @param {string} album
 * @param {string} uid
 * @param {{figuCode: string, status: number}[]} figuritas
 * @returns {Promise<void>}
 */
export function updateInventoryAsync(album, uid, figuritas) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    let batch = null;
    let batchCount = 0;

    let batchCommits = [];

    figuritas.forEach((f) => {
        let figuCode = validateFiguCode(f.figuCode);
        let status = parseInt(f.status);
        const d = doc(db, 'inventories/' + album + '/' + uid, figuCode);

        if (batch == null) {
            batch = writeBatch(db);
            batchCount = 0;
        }

        if (status === 0) {
            batch.delete(d);
        } else {
            batch.set(d, {status: status});
        }

        batchCount++;
        if (batchCount >= FirestoreWritebatchLimit) {
            batchCommits.push(batch.commit());
            batch = null;
        }
    });

    if (batch != null)
        batchCommits.push(batch.commit());

    return Promise.all(batchCommits);

    // Note: write batches cannot be reused after commit:
    // https://stackoverflow.com/questions/66143646/run-multiple-firestore-batch-commit
}

/**
 * Deletes a user's inventory for a given album.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<void>}
 */
export async function deleteInventoryAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    let colSnapshot = undefined;

    while (!(colSnapshot = await getDocs(query(c, limit(500)))).empty) {
        const batch = writeBatch(db);
        let batchCount = 0;
        colSnapshot.forEach((d) => {
            if (batchCount < 500) {
                batch.delete(d.ref);
                batchCount++;
            }
        });
        await batch.commit();
    }
}

/**
 * Gets all the figuritas faltantes in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<{ figuCode: string, status: number }[]>}
 */
export function getInventoryFaltantesAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    const q = query(c, where('status', '<', 0));
    return performFiguQuery(q);
}

/**
 * Gets all the figuritas faltantes in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<{ figuCode: string, status: number }[]>}
 */
export function getInventoryOfertadasAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    const q = query(c, where('status', '>', 0));
    return performFiguQuery(q);
}

/**
 * Counts the figuritas faltantes in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function countInventoryFaltantesAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    const q = query(c, where('status', '<', 0));
    const colSnapshot = await getCountFromServer(q);
    return colSnapshot.data().count;
}

/**
 * Counts the figuritas ofertadas in a user's inventory.
 * @param {string} album
 * @param {string} uid
 * @returns {Promise<number>}
 */
export async function countInventoryOfertadasAsync(album, uid) {
    album = validateAlbum(album);
    uid = validateUserID(uid);

    const db = getFirestore();
    const c = collection(db, 'inventories/' + album + '/' + uid);
    const q = query(c, where('status', '>', 0));
    const colSnapshot = await getCountFromServer(q);
    return colSnapshot.data().count;
}
