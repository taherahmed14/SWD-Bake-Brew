import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // CSRF protection logic
    const csrfToken = req.cookies['csrfToken'];
    const { csrfToken: csrfHeader } = req.headers;

    if (!csrfToken || csrfToken !== csrfHeader) {
      return res.status(403).send('Invalid CSRF token');
    }

    next();
  }
}
