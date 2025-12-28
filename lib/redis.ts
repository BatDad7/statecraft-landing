import { Redis } from '@upstash/redis';

// Ensure environment variables are present or fall back to mock for build time
const url = process.env.UPSTASH_REDIS_REST_URL || 'https://mock-url';
const token = process.env.UPSTASH_REDIS_REST_TOKEN || 'mock-token';

export const redis = new Redis({
  url,
  token,
});

