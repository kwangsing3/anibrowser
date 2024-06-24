import axios from 'axios'
import GetSeason from './getSeason.func.js';
import fs from 'fs';
import path from 'path';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWU0NTAwMjU0ZDM4ODExNDJmZDk3NmE4ZGNjZDE5YyIsIm5iZiI6MTcxOTA0OTAzNC42MjMzNTcsInN1YiI6IjYxMjU0NDQ4Mjk3MzM4MDAyNTQ1OTUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cTFn4-G6OtChXR0pVo2ODoVgIuE2Q-TreDw-pUKDQaY';
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
 */


/**
 * @typedef {Object} resDiscover
 * @property {Number} page
 * @property {Array<TVDetails>} results
 * @property {Number} total_pages
 * @property {Number} total_results
 */

const res = {};

/**
 * 
 * @param {String} keyword_id 
 */
export default async function GetDiscover(keyword_id) {
    /**
     * @type {resDiscover}
     */
    const raw = (await axios.get(URL + keyword_id, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }))['data'];
    for (const key of raw.results) {
        const seasons = await GetSeason(key.id, TOKEN);
        res[key.id] = {
            id: key.id,
            original_name: key.original_name,
            name: key.name,
            adult: key.adult,
            overview: key.overview,
            first_air_date: key.first_air_date,
            poster_path: key.poster_path,
            backdrop_path: key.backdrop_path,
            seasons: seasons
        }
    }
    const pat = path.join(path.resolve(), 'src', 'sample.json');
    await fs.writeFileSync(pat, JSON.stringify(res, null, 4));

    return res;
}


