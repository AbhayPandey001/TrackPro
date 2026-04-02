import dotenv from 'dotenv'
dotenv.config({ path : './.env'})

import connectDB from './db/index.js'
import app from './app.js'

connectDB()
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log('The server is listening on the port ' ,process.env.PORT)
        })
    })
    .catch((error) => {
        console.log('Error in connecting with the database')
    })
