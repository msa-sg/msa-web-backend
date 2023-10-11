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