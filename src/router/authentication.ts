import express from 'express';

import { login, register } from 'controllers/authentication';

export default (router: express.Router) => {
  const authRouter = express.Router();
  router.use('/auth', authRouter);

  authRouter.post('/register', register);
  authRouter.post('/login', login);
};
