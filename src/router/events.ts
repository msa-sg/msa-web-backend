import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controllers/event";
import express from "express";

export default (router: express.Router) => {
  router.get("/events", getEvents);
  router.get("/events/:id", getEvent);
  router.post("/events", createEvent);
  router.delete("/events/:id", deleteEvent);
  router.put("/events/:id", updateEvent);
};
