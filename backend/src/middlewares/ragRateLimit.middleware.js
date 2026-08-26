import getRedisClient from '../config/redis.js';
import logger from '../utils/logger.js';

const RATE_LIMIT_PER_HOUR = parseInt(process.env.RAG_RATE_LIMIT_PER_HOUR || '20', 10);

/**
 * Per-user rate limiting middleware for RAG chat queries.
 */
export const ragRateLimitMiddleware = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const redis = getRedisClient();
    if (!redis || redis.status !== 'ready') {
      return next(); // Fail open if Redis is temporarily unreachable
    }

    const key = `rag:ratelimit:${userId}`;
    const now = Date.now();
    const oneHourAgo = now - 3600000;

    // Use Redis Sorted Set for sliding window
    const multi = redis.multi();
    multi.zremrangebyscore(key, 0, oneHourAgo);
    multi.zadd(key, now, `${now}-${Math.random()}`);
    multi.zcard(key);
    multi.expire(key, 3600);

    const results = await multi.exec();
    const count = results[2][1];

    if (count > RATE_LIMIT_PER_HOUR) {
      logger.warn(`Per-user rate limit exceeded for user ${userId} (${count}/${RATE_LIMIT_PER_HOUR} queries in last hour).`);
      return res.status(429).json({
        success: false,
        message: `Rate limit exceeded! You can make at most ${RATE_LIMIT_PER_HOUR} AI Knowledge Hub queries per hour. Please wait a few minutes before trying again.`,
        retryAfterSeconds: 300,
      });
    }

    next();
  } catch (error) {
    logger.error(`Error in ragRateLimitMiddleware: ${error.message}`);
    next();
  }
};
