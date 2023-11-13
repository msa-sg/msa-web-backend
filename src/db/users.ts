import mongoose from "mongoose";
import bcrypt from "bcrypt";


/* Position subdocument */
export interface PositionInput {
  name: string;
  term: number;
  comPhotoLoc: string;
  termId: string;
}

export interface PositionDocument extends PositionInput, mongoose.Document {
  _id: string;
}

// This subdocument shows the position held that year. 
// The actual records of all terms and positions is in the Position schema
const PositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  term: { type: Number },
  comPhotoLoc: {
    type: String,
    validate: {
      validator: function (urlString: String) {
        return urlString.startsWith("http");
      }
    }
  },
  termId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Position'
  },
})


/* User */
interface Session {
  token: string;
  expiry: Date;
}

export interface UserInput {
  email: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  sessions?: mongoose.Types.Array<Session>;
  course?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  uniEntryYear?: Date;
  origin?: string;
  committee?: PositionInput;
}

export interface UserDocument extends UserInput, mongoose.Document {
  _id: string;
  creationDt: Date;
  comparePassword(textPwCandidate: string): Promise<boolean>;
}

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  isAdmin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true, select: false },
  sessions: {
    token: { type: String, select: false },
    expiry: { type: Date, select: false }
  },
  creationDt: { type: Date, default: Date.now, required: true },
  role: { type: String, default: "User", required: true }, // to be updated later on
  course: { type: String, required: false },
  gender: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  uniEntryYear: { type: Date, required: false },
  origin: { type: String, required: false },
  profilePhotoLoc: { type: String, required: false },
  committee: PositionSchema
});

userSchema.index({ email: 1 });

userSchema.pre("save",
  async function (this: UserDocument, next: (err?: Error) => void) {
    if (!this.isModified("password")) return next();

    // new password for this user. So generate salt upon saving
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return next();
  }
);

userSchema.methods.comparePassword = async function (textPwCandidate: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(textPwCandidate, user.password).catch(e => false);
}


export default mongoose.model<UserDocument>("User", userSchema);
