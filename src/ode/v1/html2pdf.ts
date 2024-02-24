import {RequestHandler} from "express"
import puppeteer from "puppeteer";

export const html2pdfHandler: RequestHandler = (req, res, next) => {
  const htmlContent: string = req.body;
  puppeteer.launch({headless: 'new'})
    .then(browser => browser.newPage().then(page => {return {browser, page}}))
    .then(({browser, page}) => {
      return page.setContent(htmlContent).then(() => {return {browser, page}})
    })
    .then(({browser, page}) => {
      return page.emulateMediaType('screen').then(() => {return {browser, page}})
    })
    .then(({browser, page}) => page.pdf().then((pdfBuffer) => {
      return browser.close().then(() => pdfBuffer)
    }))
    .then((pdfBuffer) => {
      res.type('application/pdf');
      res.status(200).send(pdfBuffer);
    })
    .catch(err => next(err));
}