const express = require('express')
const path = require('path')
// const babel = require('@babel/preset-react')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/index.html'));
})

app.use(express.static('./public'))
// app.use(express.static('./dist'))

app.listen(port, () => {
    console.log(`server start on http://localhost:${port}`)
})
