import {RequestHandler} from "express"
import sharp, {ResizeOptions, FitEnum} from "sharp";

export const resizeHandler: RequestHandler = (req, res, next) => {
  const sharpResizeReq: ResizeOptions = {}
  if (req.query.width) {
    sharpResizeReq.width = parseInt(req.query.width as string)
  }
  if (req.query.height) {
    sharpResizeReq.height = parseInt(req.query.height as string)
  }
  //can be cover, contain, fill, inside, outside
  //see https://sharp.pixelplumbing.com/api-resize
  if (req.query.fit) {
    sharpResizeReq.fit = req.query.fit as keyof FitEnum
  }
  sharp(req.body)
    .resize(sharpResizeReq)
    .toBuffer()
    .then((outputBuffer) => {
      res.type(req.headers["content-type"] ?? "jpg");
      res.end(outputBuffer)
    })
    .catch(err => next(err))
}