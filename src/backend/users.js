import {getAuth, getFirestore, getStorage} from "@/backend/fireGetters";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    verifyBeforeUpdateEmail,
    beforeAuthStateChanged as firebaseBeforeAuthStateChanged,
    onAuthStateChanged as firebaseOnAuthStateChanged
} from "firebase/auth";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {validateUserID} from "@/backend/validation";

/**
 * Registers a new user with an email and password and sends a verification email.
 * This also leaves the user signed in.
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 * @param {string} phone
 * @returns {Promise<UserCredential>}
 */
export async function registerWithEmailAsync(email, password, displayName, phone) {
    if (!displayName || displayName.length < 3) {
        const emailNoAt = email.substring(0, email.indexOf('@'));
        let name = "";
        let seenSpace = true;
        for (let i = 0; i < emailNoAt.length; i++) {
            const c = emailNoAt.charAt(i);
            name = name + (seenSpace ? c.toUpperCase() : c);
            seenSpace = c === ' ';
        }
        displayName = name;
    }

    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await resendVerificationEmailAsync();

    let data = {displayName: displayName};
    if (phone)
        data.phone = phone;
    await updateUserPublicProfileAsync(data, true)
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
 * Get a users' public profile data.
 * @param {String} uid The user's ID
 * @returns {Promise<Object>}
 */
export async function getUserPublicProfileAsync(uid) {
    uid = validateUserID(uid);

    const db = getFirestore();
    const d = doc(db, 'profiles-public/' + uid);
    const snapshot = await getDoc(d);
    return snapshot.exists() ? snapshot.data() : {};
}

/**
 * Gets the current user's private profile data.
 * @returns {Promise<Object>}
 */
export async function getUserPrivateProfileAsync() {
    const db = getFirestore();
    const d = doc(db, 'profiles-private/' + getCurrentUser().uid);
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
    const d = doc(db, 'profiles-public/' + getCurrentUser().uid);
    return setDoc(d, data, {merge: merge});
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
    const d = doc(db, 'profiles-private/' + getCurrentUser().uid);
    return setDoc(d, data, {merge: merge});
}

/**
 * Gets a user's profile picture. If the user has no profile picture, returns a link to
 * a default profile picture.
 * @param {string} uid
 * @returns {Promise<string>} The URL to the profile picture.
 */
export async function getUserProfilePictureAsync(uid) {
    uid = validateUserID(uid);

    try {
        const storage = getStorage();
        const imageRef = ref(storage, 'profiles/' + uid);
        const url = await getDownloadURL(imageRef);

        if (typeof url !== 'string' || url.length === 0)
            throw 'Upsie 💀';
        return url;
    } catch (e) {
        return require('../assets/empty-profile.jpg');
    }
}

/**
 * Uploads a profile picture for the current user.
 * @param {string} filePath The path to the file on disk to upload
 * @returns {Promise<string>} The URL to the profile picture.
 */
export async function uploadProfilePicture(filePath) {
    const storage = getStorage();
    const imageRef = ref(storage, 'profiles/' + getCurrentUser().uid);

    const uploadResult = await uploadBytes(imageRef, filePath);
    return await getDownloadURL(uploadResult.ref);
}

export async function onAuthStateChanged(observer) {
    firebaseOnAuthStateChanged(getAuth(), observer);
}

export async function beforeAuthStateChanged(observer) {
    firebaseBeforeAuthStateChanged(getAuth(), observer);
}

/**
 * Gets the average rating of a user. Returns a number in the range [1, 10] that
 * is the user's average rating. (1 = half a star, 5 = two and a half stars, etc.).
 * Returns null if a user has not been rated yet.
 * @param {String} uid The user's ID
 * @returns {Promise<{average: number, total: number} | null>}
 */
export async function getUserRatingAsync(uid) {
    const db = getFirestore();
    const docRef = doc(db, 'reviews/' + uid);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists())
        return {average: 0, total: 0};

    const docData = snapshot.data();
    let totalSum = 0;
    let totalCount = 0;
    for (let i = 1; i <= 10; i++) {
        const reviewField = 'r' + i;
        if (docData[reviewField]) {
            totalSum += docData[reviewField] * i;
            totalCount += docData[reviewField];
        }
    }

    return {
        total: totalCount,
        average: totalCount == 0 ? null : (totalSum / totalCount)
    };
}
