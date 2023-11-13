import express from "express";
import { verifyUser, createUser, findUserByEmail } from "services/users";

interface errorResult {
  code: number;
  message: string;
  error?: [{
    field: string;
    desc: string;
  }];
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: { email: string, password: string } = req.body;

    if (!email || !password) {
      var errorObj: errorResult = {
        code: 1000,
        message: "Insufficient values"
      };
      if(!email){
        errorObj.error?.push({
          field: "email", desc: "Missing"
        })
      }
      if(!password){
        errorObj.error?.push({
          field: "password", desc: "Missing"
        })
      }
      return res.status(400).json(errorObj);
    }

    const user = await findUserByEmail(email, { password: 1 }, true, { lean: false });
    const isUser: boolean = await verifyUser(user, email, password)
    if (!isUser) {
      return res.sendStatus(404);
    }

    // generate session and send it as a cookie
    req.session.regenerate(function (err: Error) {
      if (err) {
        console.log("Regeneration failed:", err.message);
        return res.sendStatus(500);
      }
      else {
        req.session.user = user;
        req.session.save(function (err: Error) {
          if (err) {
            console.log(err.message)
            return res.sendStatus(500);
          }
          else {
            const result = {
              message: "Login ok",
              data: {
                user
              }
            }
            return res.status(200).json(result).end();
          }
        })
      }
    })
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, isAdmin }: { email: string, password: string, username: string, isAdmin?: boolean }
      = req.body;

    if (!email || !password || !username) {
      var errorObj: errorResult = {
        code: 1000,
        message: "Insufficient values"
      };
      if(!email){
        errorObj.error?.push({
          field: "email", desc: "Missing"
        })
      }
      if(!password){
        errorObj.error?.push({
          field: "password", desc: "Missing"
        })
      }
      if(!username){
        errorObj.error?.push({
          field: "username", desc: "Missing"
        })
      }
      return res.status(400).json(errorObj);
    }
    console.log("registering ...");

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      var errorObj: errorResult = {
        code: 1001,
        message: "Intend to duplicate object",
        error: [{
          field: "email",
          desc: "Already taken"
        }]
      }
      return res.status(400).json(errorObj);
    }

    const user = await createUser({ email: email, username: username, password: password, isAdmin: isAdmin || false })
    const result = {
      "message": "User created",
      "data": {
        "id": user._id,
        "username": user.username,
        "email": user.email
      }
    };

    return res.status(201).json(result).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
