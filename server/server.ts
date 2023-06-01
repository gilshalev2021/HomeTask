import express from 'express';
import cors from 'cors';
import queryRoute from './routes/query.route';
import * as bodyParser from 'body-parser';
import { serverPort } from './config';

var corsOptions = {
  origin: '*',
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/query', queryRoute);

app.get('/', (req, res) => {
  res.send('Hello From DunAndBradStreet!');
});

app.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
});
