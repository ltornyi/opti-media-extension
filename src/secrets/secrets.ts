import { BinaryLike, scryptSync, timingSafeEqual } from "crypto";
import { NextFunction, Request, Response } from "express";

export const checkSecrets = (req:Request, res:Response, next: NextFunction) => {
  const secrets: string[] = require('../config/apikeys.json');
  const apiKey = req.headers['opti-api-key'];
  if (!apiKey) {
    res.sendStatus(401);
    return;
  }
  for (let secret of secrets) {
    if (compareKeys(secret, apiKey as string)) {
      next();
      return;
    }
  }
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