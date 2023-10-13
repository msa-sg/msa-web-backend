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

export const getTickets = () => TicketModel.find();
export const getTicketById = (id: string) => TicketModel.findById(id);
export const createTicket = (values: Record<string, any>) =>
  new TicketModel(values).save().then((Ticket) => Ticket.toObject());
export const deleteTicketById = (id: string) =>
  TicketModel.findOneAndDelete({ _id: id });
export const updateTicketById = (id: string, values: Record<string, any>) =>
  TicketModel.findByIdAndUpdate(id, values);