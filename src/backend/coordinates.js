/**
 * Represents a coordinate with latitude and longitude.
 * @typedef {Object} Coordinates
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * Represents a coordinate with latitude and longitude, and a display name.
 * @typedef {Object} CoordinateResult
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} display_name A human-readable name for the location
 */

/**
 * Represents a coordinate with latitude and longitude.
 * @typedef {Object} MyCoordinateResult
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} accuracy
 * @property {number} altitude
 * @property {number} altitudeAccuracy
 * @property {number} heading
 * @property {number} speed
 */

/**
 * Searches for things on a map and returns a list of coordinates.
 * @param query The address (or general thing-on-a-map) to search for.
 * @param limit The maximum amount of responses
 * @return {Promise<CoordinateResult[]>}
 */
export async function findAddressCoordinatesAsync(query, limit = 10) {
    const baseUrl = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=";

    const url = baseUrl + new URLSearchParams({
        format: 'json',
        limit: limit,
        q: query
    });

    const response = await fetch(url);
    let data = await response.json();
    data.forEach(d => {
        d.latitude = d.lat;
        d.longitude = d.lon;
        d.lat = undefined;
        d.lon = undefined;
    });
    return data;
}

/**
 * Gets the coordinates of the current device.
 * @return {Promise<MyCoordinateResult>}
 */
export function findMyCoordinatesAsync() {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed
                    });
                },

                function () {
                    reject("Failed to get device position");
                });
        });
    }

    throw 'Geolocation is not activated';
}

/**
 * Calculates the distance in km between two coordinates.
 * @param {Coordinates} coords1
 * @param {Coordinates} coords2
 * @return {number} The distance in kilometers.
 * @example
 * distanceCoordinates({lat: 10.1, lon: 50.2}, {lat: 9.4, lon: 51.3});
 */
export function distanceCoordinates(coords1, coords2) {
    // 6371 for km, 3956 for miles.
    const r = 6371;

    // CONVERTS POSITIONS TO RADIANS
    const lat1 = coords1.latitude * Math.PI / 180;
    const lon1 = coords1.longitude * Math.PI / 180;
    const lat2 = coords2.latitude * Math.PI / 180;
    const lon2 = coords2.longitude * Math.PI / 180;

    // FORMULA
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    // Salida por consola (borrar cualquier cosa)
    // console.log( c*r + " K.M");
    return c * r;
}