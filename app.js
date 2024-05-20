import express from 'express'
import dotenv from 'dotenv'

import {NODE_ENV, HOST, PORT} from './src/config.js'

dotenv.config()

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0';

//App
const app = express();
app.get('/',(req, res)=>{
   res.send("Hola Mundo! This is ready for work!"); 
})

app.listen(port, () => {
   console.log(`server listening on port http://localhost:${PORT}`)
 })
