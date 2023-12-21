import { Router } from "express";
import { resizeHandler } from "./resize";
import { imageBodyParser } from "./imageBodyParser";

export const router = Router();

router.get('/', (req, res) => {
  res.send('V1 is alive');
})

router.post('/resize', imageBodyParser, resizeHandler);