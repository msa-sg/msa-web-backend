import express from "express";
import * as Events from "../db/event";

export const getEvents = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const events = await Events.getEvents();
        return res.status(200).json(events);
    }
    catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }
}

export const getEvent = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const results = await Events.getEventById(id);
        return res.status(200).json(results);
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const createEvent = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, desc, startDt,
        endDt, seatLimit, venue,
        posterLoc, promoVideoLink,
        registerStartDt, registerEndDt, entryPrice
    } = req.body;

    try {
        const result = await Events.createEvent({
            name, desc, startDt,
            endDt, seatLimit, venue,
            posterLoc, promoVideoLink,
            registerStartDt, registerEndDt, entryPrice
        });
        return res.status(201).json(result);
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const deleteEvent = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id: delId } = req.params;
        await Events.deleteEventById(delId);
        return res.status(200).json({ "message": delId });
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const updateEvent = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updateFields = {};
        const fields = ['name', 'desc', 'startDt',
            'endDt', 'seatLimit', 'venue',
            'posterLoc', 'promoVideoLink',
            'registerStartDt', 'registerEndDt', 'entryPrice'];
        for(const field of fields){
            if(req.body[field] !== undefined){
                updateFields[field] = req.body[field];
            }
        }

        const result = await Events.updateEventById(id, updateFields);
        return res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
}

