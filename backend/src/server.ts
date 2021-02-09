import { format } from "date-fns";
import express from "express";

const app = express();

app.listen(8080, () => {
    const startedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    console.log('********** SERVER STARTED *********')
    console.log('-- PORT: 8080')
    console.log(`-- STARTED AT: ${startedDate}`);
});