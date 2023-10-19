import { deleteCommittee, getCommittee, getCommittees, createCommittee, updateCommittee } from "controllers/committees";
import express from "express";

export default (router: express.Router) => {
  const commRouter = express.Router();
  router.use('/committees', commRouter);

  commRouter.get("/", getCommittees);
  commRouter.get("/:id", getCommittee);
  commRouter.post("/", createCommittee);
  commRouter.delete("/:id", deleteCommittee);
  commRouter.put("/:id", updateCommittee);
};
