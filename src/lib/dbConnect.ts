import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection:ConnectionObject = {}

export default async function dbConnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to Database")
        return
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        connection.isConnected = db.connections[0].readyState;

        console.log("Database connected successfully")
    }catch(err){
        console.log("Error connecting data base ",err)
        process.exit(1);
    }
}