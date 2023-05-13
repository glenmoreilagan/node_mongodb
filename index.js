require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/db_blogs", { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to Database."))

app.use(express.json())

app.use('/posts', require('./routes/posts'))

app.listen(3000, () => console.log(`Server is running port: ${3000}.`))