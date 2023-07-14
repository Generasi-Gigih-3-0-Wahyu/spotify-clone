import { Request, Response, NextFunction } from "express";
import { error } from "../utils/baseResponse";

const requireUser = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).json(error("You must be logged in", res.statusCode));
  }

  return next();
};

export default requireUser;
