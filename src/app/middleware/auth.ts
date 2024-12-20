/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(400, 'Forbidden Access');
    }
    console.log('Token Paisos ',token);
    
    jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(400, 'Forbidden Access');
      }

      const role = (decoded as JwtPayload).role;

      if(requiredRoles && !requiredRoles.includes(role)){
        throw new AppError(400, 'You are not authorized');
      }

      




      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
