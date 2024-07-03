import axios from 'axios'
import GetSeason from './getSeason.func.js';
import fs from 'fs';
import path from 'path';
import getTokenFunc from './getToken.func.js';
import GetGenre from './getTVGenre.func.js';

const URL = `https://api.themoviedb.org/3/discover/tv?
include_adult=true
&include_null_first_air_dates=false
&language=zh-tw
&sort_by=popularity.desc
&with_keywords=`;
const TOKEN = getTokenFunc;
/**
 * @typedef {Object} TVDetails
 * @property {Number} id
 * @property {String} original_name
 * @property {String} name
 * @property {Boolean} adult
 * @property {String} overview
 * @property {String} first_air_date
 * @property {String} poster_path
 * @property {String} backdrop_path
 * @property {Array<Number>} genre_ids
 */

/**
 * @typedef {Object} resDiscover
 * @property {Number} page
 * @property {Array<TVDetails>} results
 * @property {Number} total_pages
 * @property {Number} total_results
 */

/**
 * @typedef {Object} Database
 * @property {{id: number, name: string}[]} genre_ids 
 * @property {{[key:string]:TVDetails}} data
 */


/**
 * @type {Database}
 */
const res = {
    data: {},
    genre_ids: []
};



/**
 * 根據關鍵字(id)獲取相關的影集內容。
 * @param {String} keyword_id 
 */
export default async function GetDiscover(keyword_id) {

    // Fill Genres
    res.genre_ids = (await GetGenre());

    let cur_page = 0;
    let total_pages = 0;
    do {
        /**
         * Fill TVseries
         * @type {resDiscover}
         */
        const raw = (await axios.get(URL + keyword_id + `&page=${++cur_page}`, {
            headers: {
                'Authorization': `${TOKEN}`
            }
        }))['data'];

        total_pages = raw?.['total_pages'];
        total_results = raw?.['total_results'];
        await Insert(raw.results).finally(() => {
            conter += raw.results.length;
            console.log(`Total: ${conter}/${total_results}`);
        });
    } while (total_pages !== undefined && cur_page <= total_pages);


    const pat = path.join(path.resolve(), 'src', 'sample.json');
    await fs.writeFileSync(pat, JSON.stringify(res, null, 4));

    return res;
}
let total_results = 0;
let conter = 0;
/**
 * 
 * @param {Array<TVDetails>} data 
 */
async function Insert(data) {
    for (const key of data) {
        const da = new Date(key.first_air_date);
        if (da.getFullYear() < 2000) continue;
        const seasons = await GetSeason(key.id, TOKEN);
        res.data[key.id] = {
            id: key.id,
            original_name: key.original_name,
            name: key.name,
            adult: key.adult,
            overview: key.overview,
            first_air_date: key.first_air_date,
            poster_path: key.poster_path,
            backdrop_path: key.backdrop_path,
            seasons: seasons,
            genre_ids: key.genre_ids

        }
        console.log(`${key.name}`);
    }
}
