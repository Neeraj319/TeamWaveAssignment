import fetchFromAPI from "./fetchData.js";
import displayData from "./displayData.js";


const form = document.querySelector('form');
const tagged = document.querySelector('.tagged');
const btn = document.querySelector('button');
let url = "http://localhost:8000/search?"
const data = {}


btn.addEventListener('click', async (e) => {
    e.preventDefault()

    if (tagged.value === '') {
        alert('tagged is a required field')
        return;
    }
    form.childNodes.forEach(node => {
        if (node.nodeName === '#text' || node.nodeName === 'BUTTON' || node.nodeName === "BR") {
            return;
        }
        if (node.value != "") {
            if (node.getAttribute('type') === 'date') {
                let date_to_string = new Date(node.value).getTime()
                data[node.getAttribute('name')] = date_to_string
                return;
            }
            data[node.getAttribute('name')] = node.value;
        }
    })
    for (let key in data) {
        url += `${key}=${data[key]}&`
    }
    url = url.slice(0, -1)

    let dataFromAPI = (await fetchFromAPI(url));
    if (dataFromAPI) {
        displayData(dataFromAPI)
    }
});

