import express from 'express';
const queryRoute = express.Router();
import queryController from '../controllers/queryController';

queryRoute.route('/').get((req: any, res: any) => {
  const {query} = req.query;
  queryController
    .queryRecords(query)
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err: Error) => {
      res.status(500).send(`An error occurred: ${err}`);
    });
});

queryRoute.route('/').post((req: any, res: any) => {
  const query = req.body.query;
  queryController
    .queryRecords(query, true)
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err: Error) => {
      res.status(500).send(`An error occurred: ${err}`);
    });
});

queryRoute.route('/past-queries').get((req: any, res: any) => {
  queryController
    .getPastQueries()
    .then((queries) => {
      res.status(200).send(queries);
    })
    .catch((err: Error) => {
      res.status(500).send(`An error occurred: ${err}`);
    });
});

export default queryRoute;
