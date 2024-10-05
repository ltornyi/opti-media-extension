import {ErrorRequestHandler} from "express"
import { logError } from "./logging";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logError(`errorHandler ${err}`);
  res.status(500);
  res.send(`${err}`)
}