import { DB_CONNECTION } from "./config/petsDB.js";
import authRoutes from './routes/authRoutes.js';
import petsRoutes from './routes/petsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import cookieParser from "cookie-parser";
import express from "express";
import chalk from 'chalk';
import cors from 'cors';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DB_NAME;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", usersRoutes);
app.use("/pet", petsRoutes);

app.listen(PORT, () => {
    console.log(chalk.yellow.bold(`Listening on port ${PORT}.`));
    DB_CONNECTION.connect(err => {
        if (err) throw err;
        console.log(chalk.yellow.bold(`Connected to ${DB}.`));
    });
});