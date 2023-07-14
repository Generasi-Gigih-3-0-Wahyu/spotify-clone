import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findUserByEmail, findUserById } from "../services/user.service";
import { error, success } from "../utils/baseResponse";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.sevice";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export async function createSessionController(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json(error("Invalid credentials", res.statusCode));
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(401).json(error("Invalid credentials", res.statusCode));
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user.id });

  // send the tokens
  res
    .status(201)
    .json(
      success(
        "Successfully signed",
        { accessToken, refreshToken },
        res.statusCode
      )
    );
}

export async function refreshAccessTokenController(
  req: Request,
  res: Response
) {
  const refreshToken = get(req, "headers.x-refresh")?.toString();

  if (!refreshToken) {
    return res.status(401).send("Could not refresh access token");
  }

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "REFRESH_PUBLIC_KEY"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session?.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
