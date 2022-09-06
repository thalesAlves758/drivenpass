import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 5000; /* eslint-disable-line */

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
