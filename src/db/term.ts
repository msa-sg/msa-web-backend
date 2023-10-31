import { Schema, model } from "mongoose";
import { CommitteeModel } from "./committee";
import { UserModel } from "./users";
import mongoose from 'mongoose';

const TermSchema = new Schema({
  position: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Committee'
  },
  userid: { type: Schema.Types.UUID, ref: UserModel.name },
  endDt: { type: Date },
  term: { type: Number },
  startDt: { type: Date },
  comPhotoLoc: {
    type: String,
    validate: {
      validator: function (urlString: String) {
        return urlString.startsWith("http");
      }
    }
  }
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