
const fetchFromAPI = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export default fetchFromAPI;