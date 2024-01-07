const express = require('express')
const app = express()
const connectDB = require('./Utils/database')
require('dotenv').config()
const cors = require('cors')
const user_Router = require('./Users/router')
const product_Router = require('./Products/router')

const port = process.env.SERVER_PORT

app.use(cors())
app.use(express.json())

app.use('/api', user_Router)
app.use('/api', product_Router)


app.listen(port, () => {
  connectDB().then(() => {
    console.log(`Example app listening on http://localhost:${port}`)
  })
  .catch((err) => { console.log(err) })
})