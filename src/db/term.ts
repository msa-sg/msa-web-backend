import { Schema, model } from "mongoose";
import { CommitteeModel } from "./committee";
import { UserModel } from "./users";

const TermSchema = new Schema({
    cid: {type: Schema.Types.UUID, ref: CommitteeModel.name},
    userid: {type: Schema.Types.UUID, ref: UserModel.name},
    endDt: {type: Date},
    term: {type: Number},
    startDt: {type: Date},
    comPhotoLoc: {type: String, match: "/^http/"}
})

export const TermModel = model("Term", TermSchema);

export const getTerms = () => TermModel.find();
export const getTermById = (id: string) => TermModel.findById(id);
export const createTerm = (values: Record<string, any>) =>
  new TermModel(values).save().then((Term) => Term.toObject());
export const deleteTermById = (id: string) =>
  TermModel.findOneAndDelete({ _id: id });
export const updateTermById = (id: string, values: Record<string, any>) =>
  TermModel.findByIdAndUpdate(id, values);