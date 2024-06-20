import express, { Request, Response } from 'express';
import controllers from './Controllers';
import 'dotenv/config';
import connectDB from './infra/mongodb/db';
import cors from 'cors';
import bodyParser from 'body-parser';

connectDB();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', controllers);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

