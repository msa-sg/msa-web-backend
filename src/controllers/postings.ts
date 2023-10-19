import express from "express";
import * as Users from "../db/users";
import { toInteger } from "lodash";

export const getPostings = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        var { position, term, userid } = req.query;
        var filter = {}
        if (position !== undefined) {
            filter["committee.position"] = position;
        }
        if (term !== undefined) {
            filter["committee.term"] = toInteger(term);
        }
        if (term !== undefined) {
            filter["_id"] = userid;
        }

        const users = await Users.UserModel.find(filter, {
            username: 1, firstName: 1, lastName: 1, committee: 1
        });
        return res.status(200).json(users);
    }
    catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }
}


export const createPosting = async (
    req: express.Request,
    res: express.Response
) => {
    const { position, term, startDt, endDt, comPhotoLoc } = req.body;
    const { id: userid } = req.params;

    try {
        var user = await Users.getUserById(userid);
        await user.committee.push({
            position: position,
            term: toInteger(term),
            startDt: startDt,
            endDt: endDt,
            comPhotoLoc: comPhotoLoc
        });
        await user.save();
        const result = {"id": userid}

        return res.status(201).json(result);
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const deletePosting = async (
    req: express.Request,
    res: express.Response
) => {
    const { id: userid } = req.params;
    const { position } = req.body;
    try {
        const user = await Users.getUserById(userid);
        await user.committee.pull({ position });
        await user.save();
        return res.status(200).json({ "message": `position ${position} removed from user ${userid}` });
    }
    catch (e) {
        return res.status(400).json(e.message);
    }
}

export const updatePosting = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const {position: posId} = req.body;

    try {
        const updateFields = {};
        const fields = ['term', 'startDt', 'endDt', 'comPhotoLoc'];

        for(const field of fields){
            if(req.body[field] !== undefined){
                updateFields[`committee.$.${field}`] = req.body[field];
            }
        }
        await Users.UserModel.updateOne(
            {"_id": id, "committee.position": posId}, 
            {$set: updateFields}
        )

        return res.status(200).json({"message": `Updated user ${id}`});
    }
    catch (e) {
        res.status(400).json(e.message);
    }
}

