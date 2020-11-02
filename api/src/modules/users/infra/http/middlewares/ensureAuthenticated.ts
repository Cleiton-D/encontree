import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

function verifyToken(token: string): TokenPayload {
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    return decoded as TokenPayload;
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}

const ensureAuthenticated = {
  express(request: Request, response: Response, next: NextFunction): void {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authorization.split(' ');
    const { sub } = verifyToken(token);
    request.user = {
      id: sub,
    };

    return next();
  },

  socket(socket: Socket, next: (err?: string) => void): void {
    try {
      const { token } = socket.handshake.query;
      const { sub } = verifyToken(token);

      // eslint-disable-next-line no-param-reassign
      socket.user = {
        id: sub,
      };
      next();
    } catch (err) {
      next(err);
    }
  },
};

export default ensureAuthenticated;
