import {RequestHandler} from "express"
import puppeteer from "puppeteer";
import { logDebug, logError, logInfo } from "../../common/logging";

export const html2pdfHandler: RequestHandler = (req, res, next) => {
  logInfo('html2pdfHandler starts');
  const htmlContent: string = req.body;
  puppeteer.launch({headless: 'new'})
    .then(browser => {
      logDebug('html2pdfHandler creates new page');
      return browser.newPage().then(page => {return {browser, page}})
    })
    .then(({browser, page}) => {
      logDebug('html2pdfHandler sets pagecontent');
      return page.setContent(htmlContent).then(() => {return {browser, page}})
    })
    .then(({browser, page}) => {
      logDebug('html2pdfHandler sets mediatype to screen');
      return page.emulateMediaType('screen').then(() => {return {browser, page}})
    })
    .then(({browser, page}) => page.pdf().then((pdfBuffer) => {
      logDebug('html2pdfHandler browser generates page as pdfbuffer');
      return browser.close().then(() => pdfBuffer)
    }))
    .then((pdfBuffer) => {
      logInfo('html2pdfHandler returns pdf response');
      res.type('application/pdf');
      res.status(200).send(pdfBuffer);
    })
    .catch(err => {
      logError(`html2pdfHandler ${err}`);
      next(err)
    });
}