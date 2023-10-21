import { ticketCreate, singleTicketGet, ticketsGet, singleTicketUpdate } from "controllers/ticket";
import express from "express";

const ticketRouter = express.Router();

ticketRouter.get("/", ticketsGet); // Admin, ?eid?userid
ticketRouter.post("/", ticketCreate);
ticketRouter.get("/:tid", singleTicketGet);
ticketRouter.put("/:tid", singleTicketUpdate);

export default ticketRouter;