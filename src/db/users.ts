import mongoose from "mongoose";

// Term Config
const TermSchema = new mongoose.Schema({
  position: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Committee'
  },
  term: { type: Number },
  startDt: { type: Date },
  endDt: { type: Date },
  comPhotoLoc: {
    type: String,
    validate: {
      validator: function (urlString: String) {
        return urlString.startsWith("http");
      }
    }
  }
})

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
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
  committee: [TermSchema]
});

export const UserModel = mongoose.model("User", UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
