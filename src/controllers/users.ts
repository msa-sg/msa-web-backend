import express from "express";
import { deleteUser, findUser, findUserById } from "services/users";


export const userGetAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await findUser({});

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const userDelete = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const userUpdate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await findUserById(id);

    if (!user) return res.status(400);

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
