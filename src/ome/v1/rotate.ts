import {RequestHandler} from "express"
import sharp from "sharp";
import { logDebug, logError, logInfo } from "../../common/logging";

export const rotateHandler: RequestHandler = (req, res, next) => {
  logInfo('rotateHandler starts');
  const angle = req.query.angle ? parseInt(req.query.angle as string) : 90;
  logDebug(`rotate angle: ${angle}`);
  
  sharp(req.body)
    .rotate(angle)
    .toBuffer()
    .then((outputBuffer) => {
      logInfo('rotate complete, setting response');
      res.type(req.headers["content-type"] ?? "jpg");
      res.end(outputBuffer)
    })
    .catch(err => {
      logError(`rotateHandler ${err}`);
      next(err);
    })
}