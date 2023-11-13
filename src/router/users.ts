import express from "express";

import { userGetAll, userDelete, userUpdate } from "controllers/users";
import { isAuthenticated, isOwner, isAdmin } from "middlewares";

export default (router: express.Router) => {
  const userRouter = express.Router();
  router.use('/users', userRouter);

  // userRouter.get("/", getAllUsers);
  userRouter.get("/", isAuthenticated, isAdmin, userGetAll);
  userRouter.delete("/:id", isAuthenticated, isOwner, userDelete);
  userRouter.patch("/:id", isAuthenticated, isOwner, userUpdate);
};
