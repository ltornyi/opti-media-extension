import { BinaryLike, scryptSync, timingSafeEqual } from "crypto";
import { NextFunction, Request, Response } from "express";
import { logInfo, logWarn } from "../common/logging";

interface Secret {
  client: string,
  secret: string
}

export const checkSecrets = (req:Request, res:Response, next: NextFunction) => {
  const apikeys: Secret[] = require('../config/apikeys.json');
  const apiKey = req.headers['opti-api-key'];
  if (!apiKey) {
    logWarn('No opti-api-key header');
    res.sendStatus(401);
    return;
  }
  for (let entry of apikeys) {
    if (compareKeys(entry.secret, apiKey as string)) {
      logInfo(`CALL from client:${entry.client}`)
      next();
      return;
    }
  }
  logWarn(`INVALID key: ${apiKey}`)
  res.sendStatus(401);
}

const compareKeys = (storedKey:string, suppliedKey:BinaryLike) => {
  const [hashedPassword, salt] = storedKey.split('.');
  if (!salt || salt.length !== 32) {
    return false;
  }

  const buffer = scryptSync(suppliedKey, salt, 64);
  return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
}