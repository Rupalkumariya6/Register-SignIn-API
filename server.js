const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

const port = 5000
console.log(`server will run on port ${port}`)

app.use(cors());
app.use(express.json())

app.use('/api', require('./router/AuthRouter'))


app.get('/', (req, res) => {
    res.send("welcome to backend")
})

mongoose.connect('mongodb://127.0.0.1:27017/authApi').then((res) => {
    console.log("mongodb is connect")
}).catch((error) => {
    console.error(error.message);
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
