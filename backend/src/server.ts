import { format } from "date-fns";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import development from './env/development';
import routes from './infra/routes';
import "./config/mongoConnection";
import AppError from "./infra/errors/AppError";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
    });
});

app.listen(development.port, () => {
    const startedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    console.log('********** SERVER STARTED *********')
    console.log(`-- Port: ${development.port}`);
    console.log(`-- Started at: ${startedDate}`);
});