/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { NextFunction, Request, Response } from 'express';

const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  return res.status(404).json({
    success: false,
    message : "API Not Found !!",
    error: '',
  });
};

export default notFound;
