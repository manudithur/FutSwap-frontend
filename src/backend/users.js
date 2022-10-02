import {
    getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser,
    signOut, sendPasswordResetEmail, verifyBeforeUpdateEmail, updateProfile
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { validateUserID } from "@/backend/validation";

/**
 * Registers a new user with an email and password and sends a verification email.
 * This also leaves the user signed in.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export async function registerWithEmailAsync(email, password) {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await resendVerificationEmailAsync();
    return user;
}

/**
 * Sends the currently signed-in user a new verification email.
 * @returns {Promise<void>}
 */
export function resendVerificationEmailAsync() {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser);
}

/**
 * Signs in a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export function signInWithEmailAsync(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sends a password reset email
 * @returns {Promise<void>}
 */
export function resetPasswordWithEmailAsync(email) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
}

/**
 * Signs out the current user.
 * @returns {Promise<void>}
 */
export function signOutAsync() {
    const auth = getAuth();
    return signOut(auth);
}

/**
 * Deletes the currently signed-in user, and signs out.
 * @returns {Promise<void>}
 */
export function deleteUserAsync() {
    const auth = getAuth();
    return deleteUser(auth.currentUser);
}

/**
 * Gets the currently signed-in user.
 * @returns {User}
 */
export function getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
}

/**
 * Deletes the currently signed-in user.
 * @returns {Promise<void>}
 */
export function deleteCurrentUserAsync() {
    const auth = getAuth();
    return auth.currentUser.delete();
}

/**
 * Updates the currently signed-in user's email. This will send a verification email to the new address first.
 * @param {string} newEmail
 * @returns {Promise<void>}
 */
export function updateUserEmailAsync(newEmail) {
    const auth = getAuth();
    return verifyBeforeUpdateEmail(auth.currentUser, newEmail);
}

/**
 * Updates the currently signed-in user's. For any of the parameters, pass undefined to
 * not update that parameter, or pass null to delete the current value.
 * @param {string?} displayName
 * @param {string?} photoURL
 * @returns {Promise<void>}
 */
export function updateUserProfileAsync(displayName, photoURL) {
    const auth = getAuth();

    let params = {};
    if (displayName !== undefined)
        params.displayName = displayName;
    if (photoURL !== undefined)
        params.photoURL = photoURL;

    return updateProfile(auth.currentUser, params);
}

/**
 * Get a users' public profile data.
 * @param {String} uid The user's ID
 * @returns {Promise<Object>}
 */
export async function getUserPublicProfileAsync(uid) {
    uid = validateUserID(uid);

    const db = getFirestore();
    const d = doc(db, 'profiles/' + uid + '-public');
    const snapshot = await getDoc(d);
    return snapshot.exists() ? snapshot.data() : {};
}

/**
 * Gets the current user's private profile data.
 * @returns {Promise<Object>}
 */
export async function getUserPrivateProfileAsync() {
    const db = getFirestore();
    const d = doc(db, 'profiles/' + getCurrentUser().uid + '-private');
    const snapshot = await getDoc(d);
    return snapshot.exists() ? snapshot.data() : {};
}

/**
 * Updates the current user's public profile.
 * @param {Object} data
 * @param {Boolean} merge If true, the passed profile data will be merged with the existing data on the database.
 * If false, the passed profile data will fully overwrite existing data on the database.
 * @returns {Promise<void>}
 */
export function updateUserPublicProfileAsync(data, merge = true) {
    const db = getFirestore();
    const d = doc(db, 'profiles/' + getCurrentUser().uid + '-public');
    return setDoc(d, data, { merge: merge });
}

/**
 * Updates the current user's private profile.
 * @param {Object} data
 * @param {Boolean} merge If true, the passed profile data will be merged with the existing data on the database.
 * If false, the passed profile data will fully overwrite existing data on the database.
 * @returns {Promise<void>}
 */
export function updateUserPrivateProfileAsync(data, merge = true) {
    const db = getFirestore();
    const d = doc(db, 'profiles/' + getCurrentUser().uid + '-private');
    return setDoc(d, data, { merge: merge });
}