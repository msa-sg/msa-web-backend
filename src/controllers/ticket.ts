import { EventModel } from "db/event";
import { TicketModel, getTickets, getTicketById } from "db/ticket";
import express from "express";

export const ticketsGet = async (
    req: express.Request,
    res: express.Response
) => {
    const {userid, eid} = req.query;

    try{
        // getTickets()
    }
    catch(e){
        console.log(e.message);
    }
}

export const singleTicketGet = async (
    req: express.Request,
    res: express.Response
) => {
    const {id: tid} = req.params;

    try{
        
    }
    catch(e){

    }
}


export const ticketCreate = async (
    req: express.Request,
    res: express.Response
) => {
    const {userid, eid} = req.body
    try{
        const event = await EventModel.findById(eid);
        if(event === undefined){
            res.status(400).json({"message": "No such event"});
        }

        const ticket = await TicketModel.create({purchasePrice: event.entryPrice, userId: userid, eventId: eid})
        res.status(200).json(ticket.toObject());
    }
    catch(e){
        console.log(e.message);
    }
}


export const ticketReserve = async (
    req: express.Request,
    res: express.Response
) => {
    const {id: tid} = req.params;

    try{
        
    }
    catch(e){

    }
}


export const ticketBook = async (
    req: express.Request,
    res: express.Response
) => {
    const {id: tid} = req.params;

    try{
        
    }
    catch(e){

    }
}