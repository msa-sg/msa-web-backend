import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controllers/event";
import express from "express";

export default (router: express.Router) => {
  const eventRouter = express.Router();
  router.use('/events', eventRouter);
  
  eventRouter.get("/", getEvents);
  eventRouter.get("/:id", getEvent);
  eventRouter.post("/", createEvent);
  eventRouter.delete("/:id", deleteEvent);
  eventRouter.put("/:id", updateEvent);
};
