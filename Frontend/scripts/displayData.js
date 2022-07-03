import fetchFromAPI from "./fetchData.js";

const container_div = document.querySelector('.container');

const createTableHead = () => {
    let table = document.createElement('table')
    table.classList.add('table', "table-bordered")
    let thead = document.createElement('thead')
    let sn = document.createElement('th')
    sn.innerText = 'S.N.'
    sn.setAttribute('scope', 'col')
    let name = document.createElement('th')
    name.innerText = 'User'
    name.setAttribute('scope', 'col')
    let isAnswered = document.createElement('th')
    isAnswered.innerText = 'Is Answered'
    isAnswered.setAttribute('scope', 'col')
    let question = document.createElement('th')
    question.innerText = 'Question'
    question.setAttribute('scope', 'col')

    thead.appendChild(sn)
    thead.appendChild(name)
    thead.appendChild(isAnswered)
    thead.appendChild(question)
    table.appendChild(thead)
    return table;
}


const createPagination = (paginate) => {
    if (paginate.type === "next") {
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-dark', "my-2")
        btn.innerText = 'Next'
        btn.classList.add("float-end")
        container_div.appendChild(btn)
        btn.addEventListener('click', async () => {
            let dataFromAPI = (await fetchFromAPI(paginate.url));
            if (dataFromAPI) {
                displayData(dataFromAPI)
            }
        }
        )
    }
    if (paginate.type === "prev") {
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-warning', "my-2")
        btn.innerText = 'Previous'
        btn.classList.add("float-start")
        container_div.appendChild(btn)
        btn.addEventListener('click', async () => {
            let dataFromAPI = (await fetchFromAPI(paginate.url));
            if (dataFromAPI) {
                displayData(dataFromAPI)
            }
        }
        )
    }

}

const createGotToHomePage = () => {
    const btn = document.createElement('button')
    btn.classList.add('btn', 'btn-primary', "my-2")
    btn.innerText = 'Go to Home Page'
    btn.classList.add("float-end")
    container_div.appendChild(btn)
    btn.addEventListener('click', () => {
        window.location.href = "/"
    }
    )
}


const displayData = (response_data) => {
    let data = response_data.items
    if (container_div.childNodes.length > 4) {
        let child = container_div.lastElementChild;
        while (child) {
            if (container_div.childNodes.length <= 4) {
                break;
            }
            container_div.removeChild(child);
            child = container_div.lastElementChild;
        }
    }
    createGotToHomePage()
    let table = createTableHead()
    container_div.appendChild(table)
    let t_body = document.createElement('tbody')
    let count = 1;
    for (let key in data) {
        let HTML = `<tr> 
        <th scope = 'row'>${count}</th>
        <td>${data[key].owner.display_name}</td>
        <td>${data[key].is_answered}</td>
        <td><a href = '${data[key]["link"]}' target = '_blank'>${data[key].title}</a></td>
        </tr>`
        t_body.innerHTML += HTML
        count++;
    }
    table.appendChild(t_body)
    if (response_data['next']) {
        createPagination({ type: "next", url: response_data['next'] })
    }
    if (response_data['prev']) {
        createPagination({ type: "prev", url: response_data['prev'] })
    }
}
export default displayData;