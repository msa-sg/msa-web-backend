import express from "express";
import * as Committees from "db/committee";

export const getCommittees = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const events = await Committees.getCommittees();
        return res.status(200).json(events);
    }
    catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }
}

export const getCommittee = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const results = await Committees.getCommitteeById(id);
        return res.status(200).json(results);
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const createCommittee = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, desc } = req.body;

    try {
        const result = await Committees.createCommittee({
            name, desc
        });
        return res.status(201).json(result);
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const deleteCommittee = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id: delId } = req.params;
        await Committees.deleteCommitteeById(delId);
        return res.status(200).json({ "message": delId });
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const updateCommittee = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updateFields = {};
        const fields = ['name', 'desc'];
        for (const field of fields) {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        }

        const result = await Committees.updateCommitteeById(id, updateFields);
        return res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json(e.message);
    }
}

