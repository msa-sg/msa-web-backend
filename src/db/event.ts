import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String},
    startDt: {type: Date, required: true},
    endDt: {type: Date},
    creationDt: {type: Date, default: Date.now, required: true},
    seatLimit: {type: Number},
    venue: {type: String},
    posterLoc: {type: String, match: "/^http"},
    promoVideoLink: {type: String, match: "/^http"},
    registerStartDt: {type: Date},
    registerEndDt: {type: Date}
});

export const EventModel = mongoose.model("Event", EventSchema);

