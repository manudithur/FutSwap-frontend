import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { validateAlbum, validateFiguCode } from "@/backend/validation";

/**
 * Represents a figurita's data.
 * @typedef {Object} FiguData
 * @property {String} code The figurita's code, formed by the category's abbreviation and the number. For example, 'arg03'.
 * @property {String} category The figurita's category, such as "Fifa World Cup", "Coca", or country's name.
 * @property {number} number The figurita's number within its category. For example, 3 for 'arg03'.
 */

/**
 * Gets a figu's data from its album and figuCode.
 * @param {string} album The album's name. For example, 'qatar2022'.
 * @param {string} figuCode The figu's code. For example, 'arg05'.
 * @returns {Promise<FiguData>}
 */
export async function getFiguDataAsync(album, figuCode) {
    album = validateAlbum(album);
    figuCode = validateFiguCode(figuCode);

    const db = getFirestore();
    const d = doc(db, 'albums/' + album + '/figus/' + figuCode);
    const snapshot = await getDoc(d);
    if (!snapshot.exists())
        throw 'Unexistant album or figuCode: ' + album + '/' + figuCode;

    let figu = snapshot.data();
    figu.code = figuCode;
    return figu;
}

/**
 * Gets the data of all the figus in an album.
 * @param album The album's name. For example, 'qatar2022'.
 * @returns {Promise<FiguData[]>}
 */
export async function getAllFigusDataAsync(album) {
    album = validateAlbum(album);

    const db = getFirestore();
    const c = collection(db, 'albums/' + album + '/figus/');
    const colSnapshot = await getDocs(c);

    let figus = [];
    colSnapshot.forEach((d) => {
        let figu = d.data();
        figu.code = d.id;
        figus.push(figu);
    });

    return figus;
}

/*
import { writeBatch } from 'firebase/firestore';
export async function fillDatabase() {
    const categories = [
        { category: "QAT", fullName: "Qatar"},
        { category: "ECU", fullName: "Ecuador"},
        { category: "SEN", fullName: "Senegal"},
        { category: "NED", fullName: "Países Bajos"},
        { category: "ENG", fullName: "Inglaterra"},
        { category: "IRN", fullName: "Irán"},
        { category: "USA", fullName: "Estados Unidos"},
        { category: "WAL", fullName: "Gales"},
        //{ category: "ARG", fullName: "Argentina"},
        { category: "KSA", fullName: "Arabia Saudita"},
        { category: "MEX", fullName: "México"},
        { category: "POL", fullName: "Polonia"},
        { category: "FRA", fullName: "Francia"},
        { category: "AUS", fullName: "Australia"},
        { category: "DEN", fullName: "Dinamarca"},
        { category: "TUN", fullName: "Túnez"},
        { category: "ESP", fullName: "España"},
        { category: "CRC", fullName: "Costa Rica"},
        { category: "GER", fullName: "Alemania"},
        { category: "JPN", fullName: "Japón"},
        { category: "BEL", fullName: "Bélgica"},
        { category: "CAN", fullName: "Canadá"},
        { category: "MAR", fullName: "Marruecos"},
        { category: "CRO", fullName: "Croacia"},
        { category: "BRA", fullName: "Brasil"},
        { category: "SRB", fullName: "Serbia"},
        { category: "SUI", fullName: "Suiza"},
        { category: "CMR", fullName: "Camerún"},
        { category: "POR", fullName: "Portugal"},
        { category: "GHA", fullName: "Ghana"},
        { category: "URU", fullName: "Uruguay"},
        { category: "KOR", fullName: "Corea"}
    ];

    const db = getFirestore();

    for (let c = 0; c < categories.length; c++) {
        const batch = writeBatch(db);
        for (let i = 0; i < (categories[c].category === 'SRB' ? 18 : 19); i++) {
            const docId = categories[c].category.toLowerCase() + (i + 101).toString().substring(1);
            const docData = {category: categories[c].fullName, number: i + 1};
            batch.set(
                doc(db, 'albums/qatar2022/figus/', docId),
                docData
            );
        }
        await batch.commit();
        // eslint-disable-next-line no-console
        console.log(categories[c].fullName);
    }
}*/