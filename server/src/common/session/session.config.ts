import { SessionOptions } from 'express-session';

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000,
  },
};
