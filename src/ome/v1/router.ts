import { Router } from "express";
import { resizeHandler } from "./resize";
import { imageBodyParser } from "./imageBodyParser";
import { rotateHandler } from "./rotate";
import { logInfo } from "../../common/logging";

export const router = Router();

router.get('/', (req, res) => {
  logInfo('omev1 root');
  res.send('V1 is alive');
})

router.post('/resize', imageBodyParser, resizeHandler);
router.post('/rotate', imageBodyParser, rotateHandler);