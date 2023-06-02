require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db_kape_shop', {
  useNewUrlParser: true,
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database.'))

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('uploads'))

app.use('/product/images', express.static('product/images'))

// app.use("/posts", require("./routes/posts"));
app.use('/api/products', require('./routes/products'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running port: ${PORT}.`))
