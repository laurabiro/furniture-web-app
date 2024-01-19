import { ErrorRequestHandler } from "express"
import { Request, Response, NextFunction } from 'express';

export const errorHandler: ErrorRequestHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  console.log(err)
  res.sendStatus(500)
}