import {
    getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser,
    signOut, sendPasswordResetEmail, verifyBeforeUpdateEmail, updateProfile
} from "firebase/auth";

/**
 * Registers a new user with an email and password and sends a verification email.
 * This also leaves the user signed in.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<UserCredential>}
 */
async function registerWithEmailAsync(email, password) {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await resendVerificationEmailAsync(user.user);
    return user;
}

/**
 * Sends the currently signed-in user a new verification email.
 * @returns {Promise<void>}
 */
function resendVerificationEmailAsync() {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser);
}

/**
 * Signs in a user with email and password.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<UserCredential>}
 */
function signInWithEmailAsync(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sends a password reset email
 * @returns {Promise<void>}
 */
function resetPasswordWithEmailAsync(email) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
}

/**
 * Signs out the current user.
 * @returns {Promise<void>}
 */
function signOutAsync() {
    const auth = getAuth();
    return signOut(auth);
}

/**
 * Deletes the currently signed-in user, and signs out.
 * @returns {Promise<void>}
 */
function deleteUserAsync() {
    const auth = getAuth();
    return deleteUser(auth.currentUser);
}

/**
 * Gets the currently signed-in user.
 * @returns {User}
 */
function getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
}

/**
 * Deletes the currently signed-in user.
 * @returns {Promise<void>}
 */
function deleteCurrentUserAsync() {
    const auth = getAuth();
    return auth.currentUser.delete();
}

/**
 * Updates the currently signed-in user's email. This will send a verification email to the new address first.
 * @param {String} newEmail
 * @returns {Promise<void>}
 */
function updateUserEmailAsync(newEmail) {
    const auth = getAuth();
    return verifyBeforeUpdateEmail(auth.currentUser, newEmail);
}

/**
 * Updates the currently signed-in user's. For any of the parameters, pass undefined to
 * not update that parameter, or pass null to delete the current value.
 * @param {String?} displayName
 * @param {String?} photoURL
 * @returns {Promise<void>}
 */
function updateUserProfileAsync(displayName, photoURL) {
    const auth = getAuth();

    let params = {};
    if (displayName !== undefined)
        params.displayName = displayName;
    if (photoURL !== undefined)
        params.photoURL = photoURL;

    return updateProfile(auth.currentUser, params);
}

/**
 * Updates the currently signed-in user's phone number. NOT IMPLEMENTED YET
 * @returns {Promise<unknown>}
 */
/*function updateUserPhoneAsync() {
    // TODO
    // const auth = getAuth();
    // https://stackoverflow.com/questions/56841486/how-do-i-update-a-firebaseusers-phone-number-in-firebase-auth}
    return new Promise(resolve => setTimeout(resolve, 1000));
}*/

export default {
    registerWithEmailAsync,
    resendVerificationEmailAsync,
    signInWithEmailAsync,
    resetPasswordWithEmailAsync,
    signOutAsync,
    deleteUserAsync,
    getCurrentUser,
    deleteCurrentUserAsync,
    updateUserEmailAsync,
    updateUserProfileAsync,
}