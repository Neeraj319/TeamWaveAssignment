
const fetchFromAPI = async (url) => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            alert("invalid search parameters")
            return;
        }
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export default fetchFromAPI;