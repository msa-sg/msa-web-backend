import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "controllers/event";
import express from "express";
import ticketRouter from "./ticket";

export default (router: express.Router) => {
  const eventRouter = express.Router();
  router.use('/events', eventRouter);
  router.use('/events/:id/tickets', ticketRouter);
  
  eventRouter.get("/", getEvents);
  eventRouter.get("/:id", getEvent);
  eventRouter.post("/", createEvent);
  eventRouter.delete("/:id", deleteEvent);
  eventRouter.put("/:id", updateEvent);
};
