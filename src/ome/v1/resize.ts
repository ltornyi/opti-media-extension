import {RequestHandler} from "express"
import sharp, {ResizeOptions, FitEnum} from "sharp";
import { logDebug, logError, logInfo } from "../../common/logging";

export const resizeHandler: RequestHandler = (req, res, next) => {
  logInfo('resizeHandler starts');
  const sharpResizeReq: ResizeOptions = {}
  if (req.query.width) {
    logDebug(`resize width: ${req.query.width as string}`)
    sharpResizeReq.width = parseInt(req.query.width as string)
  }
  if (req.query.height) {
    logDebug(`resize height: ${req.query.height as string}`)
    sharpResizeReq.height = parseInt(req.query.height as string)
  }
  //can be cover, contain, fill, inside, outside
  //see https://sharp.pixelplumbing.com/api-resize
  if (req.query.fit) {
    logDebug(`resize fit: ${req.query.fit as string}`)
    sharpResizeReq.fit = req.query.fit as keyof FitEnum
  }
  sharp(req.body)
    .resize(sharpResizeReq)
    .toBuffer()
    .then((outputBuffer) => {
      logInfo('resize complete, setting response');
      res.type(req.headers["content-type"] ?? "jpg");
      res.end(outputBuffer)
    })
    .catch(err => {
      logError(`resizeHandler ${err}`);
      next(err);
    })
}