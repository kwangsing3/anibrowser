import axios from "axios";


/**
 * 
 * @param {Number} series_id 
 * 
 * @returns {Array<Season>}
 */
export default async function GetSeason(series_id, TOKEN) {
    /**
     * @type {TVDetail}
     */
    const raw = (await axios.get(`https://api.themoviedb.org/3/tv/${series_id}?language=zh-TW`, {
        headers: {
            'Authorization': `${TOKEN}`
        }
    }))['data'];
    return raw.seasons;
}

/** 
 * @typedef Season
 * @property {String} id
 * @property {String} name
 * @property {String} poster_path
 * @property {String} season_number
 * @property {String} air_date
 * @property {String} episode_count
 */

