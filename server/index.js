const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '175ca290b06948eba5573a0c557afefe',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))
let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

        rollbar.log('student was added successfully', {author: 'Chris', type: 'manual', student: name})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))