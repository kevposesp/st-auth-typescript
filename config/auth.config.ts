import env from './env';

export default {
    secret: env.SECRET || "jangoxo-secret-key",
    jwtExpiration: env.EXPIRATION || 3600,
    jwtRefreshExpiration: env.REFRESH_EXPIRATION || 86400
};