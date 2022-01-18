require("dotenv").config();

require('./db')

const routes_auth=require('./routes/auth.js')
const routes_notes=require('./routes/notes.js')

const cors=require('cors')

const express=require('express')

const app=express()

app.use(cors())

app.use(express.json())

app.use('/api/auth',routes_auth)
app.use('/api/notes',routes_notes)

app.listen(process.env.PORT,()=>{
    console.log(`connected to port ${process.env.PORT}`)
})