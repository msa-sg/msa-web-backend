import { deleteCommittee, getCommittee, getCommittees, createCommittee, updateCommittee } from "../controllers/committees";
import express from "express";

export default (router: express.Router) => {
  router.get("/committees", getCommittees);
  router.get("/committees/:id", getCommittee);
  router.post("/committees", createCommittee);
  router.delete("/committees/:id", deleteCommittee);
  router.put("/committees/:id", updateCommittee);
};
