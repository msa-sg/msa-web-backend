import { Schema, model } from "mongoose";

const CommitteeSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String}
})

export const CommitteeModel = model("Committee", CommitteeSchema);

export const getCommittees = () => CommitteeModel.find();
export const getCommitteeById = (id: string) => CommitteeModel.findById(id);
export const createCommittee = (values: Record<string, any>) =>
  new CommitteeModel(values).save().then((Committee) => Committee.toObject());
export const deleteCommitteeById = (id: string) =>
  CommitteeModel.findOneAndDelete({ _id: id });
export const updateCommitteeById = (id: string, values: Record<string, any>) =>
  CommitteeModel.findByIdAndUpdate(id, values, {new: true});