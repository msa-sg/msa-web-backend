import { ticketCreate, singleTicketGet, ticketsGet, ticketReserve, ticketBook } from "controllers/ticket";
import express from "express";

const ticketRouter = express.Router();

ticketRouter.get("/", ticketsGet); // Admin, ?eid?userid
ticketRouter.get("/:tid", singleTicketGet);
ticketRouter.post("/", ticketCreate);
ticketRouter.put("/reserve/:tid", ticketReserve);
ticketRouter.put("/booked/:tid", ticketBook);

export default ticketRouter;