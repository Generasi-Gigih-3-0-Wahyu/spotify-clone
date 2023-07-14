import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { error } from "../utils/baseResponse";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      return res
        .status(400)
        .json(
          error(
            err.errors.length > 1 ? 
            [err.errors[0].message, err.errors[1].message] : err.errors[0].message,
            res.statusCode
          )
        );
    }
  };

export default validateResource;
