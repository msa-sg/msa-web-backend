import { deletePosting, getPostings, createPosting, updatePosting } from "../controllers/postings";
import express from "express";

export default (router: express.Router) => {
  const postingsRouter = express.Router();
  router.use('/postings', postingsRouter);

  postingsRouter.get("/", getPostings); // ?position?term?user
  postingsRouter.post("/:id", createPosting); // userid, commid
  postingsRouter.delete("/:id", deletePosting); // userid, commid
  postingsRouter.put("/:id", updatePosting); // userid, commid
};

