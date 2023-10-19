import {Schema, SchemaTypes, model} from "mongoose";
import { EventModel } from "./event";
import { UserModel } from "./users";

const TicketSchema = new Schema({
    purchasePrice: {type: Number, required: true},
    eventId: {type: SchemaTypes.ObjectId, ref: EventModel.name},
    userId: {type: SchemaTypes.ObjectId, ref: UserModel.name},
    paymentReceipt: {type: Schema.Types.UUID},
    purchaseDt: {type: Date, default: () => Date.now(), immutable: true},
    status: {type: String, default: "Unreserved"} // unreserved, reserved (between the period the user applies and pays), booked (when user has paid)
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