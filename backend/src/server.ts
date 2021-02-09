import { format } from "date-fns";
import express from "express";
import cors from "cors";
import development from './env/development';
import "./config/mongoConnection";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(development.port, () => {
    const startedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    console.log('********** SERVER STARTED *********')
    console.log(`-- Port: ${development.port}`);
    console.log(`-- Started at: ${startedDate}`);
});