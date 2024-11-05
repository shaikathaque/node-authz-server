import logger from "./logger";

const AUTHLETE_BASE_URL = 'https://api.authlete.com';

interface AuthleteConfig {
  apiKey: string;
  accessToken: string;
}

class AuthleteClient {
  private apiKey: string;
  private accessToken: string;

  constructor(config: AuthleteConfig) {
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${AUTHLETE_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${this.apiKey}:${this.accessToken}`).toString('base64')}`
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`Authlete API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Authlete request failed:', error);
      throw error;
    }
  }
}

// Create and export the client instance
if (!process.env.AUTHLETE_API_KEY || !process.env.AUTHLETE_ACCESS_TOKEN) {
  throw new Error('Authlete credentials are not set');
}

export const authleteClient = new AuthleteClient({
  apiKey: process.env.AUTHLETE_API_KEY,
  accessToken: process.env.AUTHLETE_ACCESS_TOKEN
});
