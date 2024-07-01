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
    data:{},
    genre_ids:[]
};



/**
 * 根據關鍵字(id)獲取相關的影集內容。
 * @param {String} keyword_id 
 */
export default async function GetDiscover(keyword_id) {
    // Fill Genres
    res.genre_ids = (await GetGenre());


    const TOKEN = getTokenFunc;
    /**
     * @type {resDiscover}
     */
    const raw = (await axios.get(URL + keyword_id, {
        headers: {
            'Authorization': `${TOKEN}`
        }
    }))['data'];
    for (const key of raw.results) {
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
            genre_ids:key.genre_ids
        }
    }
    const pat = path.join(path.resolve(), 'src', 'sample.json');
    await fs.writeFileSync(pat, JSON.stringify(res, null, 4));

    return res;
}


