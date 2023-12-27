import {Request,Response} from "express"
import sharp from "sharp";

export const rotateHandler = (req: Request, res:Response) => {
  const angle = req.query.angle ? parseInt(req.query.angle as string) : 90;
  
  sharp(req.body)
    .rotate(angle)
    .toBuffer()
    .then((outputBuffer) => {
      res.type(req.headers["content-type"] ?? "jpg");
      res.end(outputBuffer)
    })
}