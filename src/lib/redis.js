import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function cacheGet(key) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function cacheSet(key, value, ttl = 3600) {
  await redis.setex(key, ttl, JSON.stringify(value));
} 