import express from "express";
import { findUser, verifyUser, createUser, generateSessionToken } from "services/users";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: {email: string, password: string} = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await findUser({email}, {password: 1}, true, {lean: false});
    const isUser: boolean = await verifyUser(user, email, password)
    if(!isUser){
      return res.sendStatus(404);
    }

    const token: string = generateSessionToken(user);

    res.cookie("MSA-AUTH", token, {
      path: "/"
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, isAdmin }: {email: string, password: string, username: string, isAdmin?: boolean}
     = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    console.log("registering ...");

    const existingUser = await findUser({email: email});

    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({email: email, username: username, password: password, isAdmin: isAdmin?})
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
