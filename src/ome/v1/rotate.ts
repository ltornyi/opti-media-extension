import {RequestHandler} from "express"
import sharp from "sharp";

export const rotateHandler: RequestHandler = (req, res, next) => {
  const angle = req.query.angle ? parseInt(req.query.angle as string) : 90;
  
  sharp(req.body)
    .rotate(angle)
    .toBuffer()
    .then((outputBuffer) => {
      res.type(req.headers["content-type"] ?? "jpg");
      res.end(outputBuffer)
    })
    .catch(err => next(err))
}