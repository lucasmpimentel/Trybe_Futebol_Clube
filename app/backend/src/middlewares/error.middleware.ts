import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';

const error = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = err as CustomError;
  return res.status(status || 500).json({ message });
};

export default error;