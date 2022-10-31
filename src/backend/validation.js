/**
 * Validates that an album name is in the valid format. This does not verify that it exists.
 * @param {string} album
 * @returns {string} The verified and sanitized album name.
 */
export function validateAlbum(album) {
    album = album.trim().toLowerCase();
    if (!album.match(/^[a-z0-9]+$/))
        throw 'Invalid album: ' + album;
    return album;
}

/**
 * Validates that a figu code is in the valid format. This does not verify that it exists.
 * @param {string} figuCode
 * @returns {string} The verified and sanitized figu code.
 */
export function validateFiguCode(figuCode) {
    figuCode = figuCode.trim().toLowerCase();
    if (!figuCode.match(/^([a-z]{3}[0-9]{2})$/))
        throw 'Invalid figuCode: ' + figuCode;
    return figuCode;
}

/**
 * Validates that a user id is valid. This does not verify that it exists.
 * @param {string} uid
 * @returns {string} The same uid passed as parameter.
 */
export function validateUserID(uid) {
    if (!uid.match(/^[a-zA-Z0-9]{1,128}$/))
        throw 'Invalid uid: ' + uid;
    return uid;
}