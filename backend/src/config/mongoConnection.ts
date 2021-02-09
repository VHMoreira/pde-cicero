import mongoose from "mongoose";
import development from '../env/development';

async function connect() {
    await mongoose.connect(development.host, { useNewUrlParser: true, useUnifiedTopology: true, dbName: development.db });
    console.log(`-- Host: ${development.host}`)
    console.log(`-- Database: ${development.db}`)
}

connect();