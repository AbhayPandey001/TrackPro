import mongoose from "mongoose";

async function connectDB() {
    try{
        const connectionInstance =await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log('Connected to the database :' , connectionInstance.connection.host)
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB