const { connect } = require('mongoose')
require('dotenv').config()

const db = async() => {
    await connect(process.env.MONGO_URL)
    console.log("DataBase Connected")
}

module.exports=db