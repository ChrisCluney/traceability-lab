const addForm = document.querySelector('form')
const nameInput = document.querySelector('input')
const container = document.querySelector('section')


const weatherButton = document.getElementById('button')

function submitHandler(e) {
    e.preventDefault()
    axios.post('/api/student', { name: nameInput.value, })
        .then(res => {
            container.innerHTML = ''
            nameInput.value = ''

            res.data.forEach(studentName => {
                container.innerHTML += `<p>${studentName}</p>`
            })
        })
        .catch(err => {
            nameInput.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class='close'>close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}

addForm.addEventListener('submit', submitHandler)
weatherButton.addEventListener('click', SubmitEvent)