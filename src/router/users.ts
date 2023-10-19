import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
  const userRouter = express.Router();
  router.use('/users', userRouter);

  // userRouter.get("/", getAllUsers);
  userRouter.get("/", isAuthenticated, isAdmin, getAllUsers);
  userRouter.delete("/:id", isAuthenticated, isOwner, deleteUser);
  userRouter.patch("/:id", isAuthenticated, isOwner, updateUser);
};
