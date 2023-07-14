import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";
import { error, success } from "../utils/baseResponse";

export async function createUserController(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res
      .status(201)
      .json(success("Successfully Created User", user, res.statusCode));
  } catch (err: any) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json(error("Account already exists", res.statusCode));
    }
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getCurrentUserController(_req: Request, res: Response) {
  return res
    .status(200)
    .json(
      success("Succesfully Get Current User", res.locals.user, res.statusCode)
    );
}
