import {Schema, model} from "mongoose";
import { EventModel } from "./event";
import { UserModel } from "./users";

const TicketSchema = new Schema({
    purchasePrice: {type: Number, required: true},
    eventId: {type: Schema.Types.UUID, ref: EventModel.name},
    userId: {type: Schema.Types.UUID, ref: UserModel.name},
    paymentReceipt: {type: Schema.Types.UUID},
    purchaseDt: {type: Date, required: true}
});

export const TicketModel = model("Ticket", TicketSchema);