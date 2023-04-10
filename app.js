const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const { throws } = require('assert')
const exp = require('constants')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

// routes
const accountRoute = require('./routes/account.routes')
const authRoute = require('./routes/auth.routes')
// config 
dotenv.config()

// mongoose 
mongoose.connect(process.env.MONGO_URL, (err)=> {
    try{
        console.log("Ket noi thanh cong mongoDB !")
    }catch(err) {
        console.log(err)
    }
});


// middleware 
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(cookieParser())


// routes
app.use('/api/account', accountRoute)
app.use('/api/', authRoute)

app.get('/',(req, res)=> {
    res.send('Welcome to Homepage')
})

// JSON WEB TOKEN



app.listen(process.env.PORT, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log(`Backend server is running ${process.env.PORT}`)
})