const container_div = document.querySelector('.container');
const form = document.querySelector('form')

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


const createPagination = () => {
    const btn = document.createElement('button')
    btn.classList.add('btn', 'btn-primary')
    btn.innerText = 'Next'
}

const searchAgain = () => {
    const searchAgain = document.createElement('button')
    searchAgain.classList.add('btn', 'btn-success')
    searchAgain.innerText = 'Search Again'
    searchAgain.addEventListener('click', () => {
        window.location.href = "/"
    })
    container_div.appendChild(searchAgain)
    container_div.appendChild(document.createElement('br'))

}
const displayData = (data) => {
    container_div.removeChild(form)
    searchAgain()
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
}
export default displayData;