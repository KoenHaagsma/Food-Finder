import { url } from '../config/config.js';

async function fetchData(key) {
    try {
        let res = await fetch(`${url}${key}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export { fetchData };
