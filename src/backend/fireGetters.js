import {connectAuthEmulator, getAuth as firebaseGetAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore as firebaseGetFirestore} from 'firebase/firestore';
import {connectStorageEmulator, getStorage as firebaseGetStorage} from 'firebase/storage';
import {connectFunctionsEmulator, getFunctions as firebaseGetFunctions} from 'firebase/functions';

const useEmulators = true;
const forceUseEmulators = true;
const authEmulator = {host: "localhost", port: 9099};
const firestoreEmulator = {host: "localhost", port: 8081};
const storageEmulator = {host: "localhost", port: 9199};
const functionsEmulator = {host: "localhost", port: 5001};

let auth = null;
let firestore = null;
let storage = null;
let functions = null;

export function getAuth() {
    if (auth)
        return auth;

    const newAuth = firebaseGetAuth();
    if (useEmulators) {
        try {
            connectAuthEmulator(newAuth, "http://" + authEmulator.host + ":" + authEmulator.port);
        } catch (e) {
            console.warn('useEmulators is set to true, but failed to connect to auth emulator', e);
            if (forceUseEmulators)
                throw e;
        }
    }
    auth = newAuth
    return auth;
}

export function getFirestore() {
    if (firestore)
        return firestore;

    const newFirestore = firebaseGetFirestore();
    if (useEmulators) {
        try {
            connectFirestoreEmulator(newFirestore, firestoreEmulator.host, firestoreEmulator.port);
        } catch (e) {
            console.warn('useEmulators is set to true, but failed to connect to firestore emulator', e);
            if (forceUseEmulators)
                throw e;
        }
    }
    firestore = newFirestore;
    return firestore;
}

export function getStorage() {
    if (storage)
        return storage;

    const newStorage = firebaseGetStorage();
    if (useEmulators) {
        try {
            connectStorageEmulator(newStorage, storageEmulator.host, storageEmulator.port);
        } catch (e) {
            console.warn('useEmulators is set to true, but failed to connect to storage emulator', e);
            if (forceUseEmulators)
                throw e;
        }
    }
    storage = newStorage
    return storage;
}

export function getFunctions() {
    if (functions)
        return functions;

    const newFunctions = firebaseGetFunctions();
    if (useEmulators) {
        try {
            connectFunctionsEmulator(newFunctions, functionsEmulator.host, functionsEmulator.port);
        } catch (e) {
            console.warn('useEmulators is set to true, but failed to connect to functions emulator', e);
            if (forceUseEmulators)
                throw e;
        }
    }
    functions = newFunctions;
    return functions;
}