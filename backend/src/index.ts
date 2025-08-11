import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {paymentRoute} from './routes/paymentRoute'

dotenv.config()
const app=express()
const PORT=process.env.PORT||5000
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(express.json())
app.use('/api',paymentRoute)
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
    
})