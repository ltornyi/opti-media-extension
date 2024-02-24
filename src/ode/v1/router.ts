import { Router } from "express";
import { html2pdfHandler } from "./html2pdf";
import { htmlBodyParser } from "./htmlBodyParser";

export const router = Router();

router.get('/', (req, res) => {
  res.send('V1 is alive');
})

router.post('/html2pdf', htmlBodyParser, html2pdfHandler);
