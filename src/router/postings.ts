import { deletePosting, getPostings, createPosting, updatePosting } from "../controllers/postings";
import express from "express";

export default (router: express.Router) => {
  router.get("/postings", getPostings); // ?position?term?user
  router.post("/postings/:id", createPosting); // userid, commid
  router.delete("/postings/:id", deletePosting); // userid, commid
  router.put("/postings/:id", updatePosting); // userid, commid
};

