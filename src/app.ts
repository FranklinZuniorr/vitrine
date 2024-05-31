import express, { Request, Response } from 'express';
import controllers from './Controllers';
import 'dotenv/config';
import connectDB from './infra/mongodb/db';

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', controllers);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

