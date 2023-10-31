import express from 'express';

import authentication from './authentication';
import users from './users';
// import events from './events';
// import committees from './committee';
// import postings from './postings';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  // events(router);
  // committees(router);
  // postings(router);
  return router;
};
