import { Schema, model } from "mongoose";

const CommitteeSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String}
})

export const CommitteeModel = model("Committee", CommitteeSchema);