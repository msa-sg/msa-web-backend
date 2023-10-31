import express from "express";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (req.session.user) return next();
    else return res.sendStatus(403);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (req.session.user?.isAdmin) {
      console.log("Not admin ..........");
      return res.status(401).send("You don't have the admin permission!");
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = req.session.user?.id;

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
