export const appConfig = {
    port: process.env.APP_PORT,
};

export const bcryptConfig = {
    saltRound: (process.env.BCRYPT_SALT_ROUNDS as unknown) as number,
};
  
export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};
  
export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
};