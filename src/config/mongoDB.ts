import mongoose from "mongoose";
import "dotenv/config";

async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB);
        console.log("MongoDB connect successfully");
    }
    catch(error){
        console.log("MongoDB connect failure!");
    }
}
export default {connect}