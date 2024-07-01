import axios from "axios";
import getTokenFunc from "./getToken.func.js";

export default async function GetGenre(){
    const raw = (await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=zh', {
        headers: {
            'Authorization': `${getTokenFunc}`
        }
    }))['data'];
    return raw;
}