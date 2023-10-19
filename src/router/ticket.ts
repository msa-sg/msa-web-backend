import { ticketCreate, singleTicketGet, ticketsGet, ticketReserve, ticketBook } from "controllers/ticket";
import express from "express";

export default (router: express.Router) => {
    const ticketRouter = express.Router();
    router.use('/tickets', ticketRouter);

    ticketRouter.get("/", ticketsGet); // Admin, ?eid?userid
    ticketRouter.get("/:tid", singleTicketGet);
    ticketRouter.post("/", ticketCreate);
    ticketRouter.put("/reserve/:tid", ticketReserve);
    ticketRouter.put("/booked/:tid", ticketBook);
}