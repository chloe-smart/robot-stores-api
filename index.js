const express = require('express')
const Router = require('./Router')

const app = express()
const port = 3000
app.use(express.json())

Router(app)

app.listen(port)
