
const fetchFromAPI = async (url) => {
    let response;
    try {
        response = await fetch(url);
        if (response.status !== 200) {
            if (response.status === 500) {
                alert("Internal Server Error")
                return;
            }
            if (response.status === 502) {
                alert("Bad Gateway")
                return;
            }
            if (response.status == 403) {
                alert(await response.text())
                return;
            }
            alert("invalid search parameters")
            return;
        }
        const data = await response.json();

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export default fetchFromAPI;