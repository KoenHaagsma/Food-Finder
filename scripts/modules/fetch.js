async function fetchData(url) {
    try {
        let res = await fetch(`${url}`);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export { fetchData };
