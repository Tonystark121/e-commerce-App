import express from 'express'
const app = express()

const port = process.env.PORT || 2000

app.get('/',(res, req)=>{
    console.log('Welcome to mern App')
})

app.listen(port, ()=>{
    console.log(`server is runnig at port http://localhost/${port}`)
})