const AUTHLETE_BASE_URL = 'https://us.authlete.com/api';

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
    const url = `${AUTHLETE_BASE_URL}/${this.apiKey}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    };

    try {
      console.log('Making request to:', url); // Temporary console.log for immediate feedback
      console.log('Request details:', {
        method: options.method,
        headers: {
          'Content-Type': headers['Content-Type'],
          Authorization: '***hidden***',
        },
        body: options.body,
      });

      const response = await fetch(url, {
        ...options,
        headers: headers,
      });

      const responseText = await response.text();
      console.log('Response received:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        text: responseText,
      });

      if (!response.ok) {
        throw new Error(
          `Authlete API error: ${response.status} ${response.statusText}\nResponse: ${responseText}`,
        );
      }

      return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  async authorizationRequest(parameters: {
    parameters: string; // The entire query string from the authorization request
    clientId?: string;
  }) {
    return this.request('/auth/authorization', {
      method: 'POST',
      body: JSON.stringify(parameters),
    });
  }
}

// Create and export the client instance
if (!process.env.AUTHLETE_API_KEY || !process.env.AUTHLETE_ACCESS_TOKEN) {
  throw new Error('Authlete credentials are not set');
}

export const authleteClient = new AuthleteClient({
  apiKey: process.env.AUTHLETE_API_KEY,
  accessToken: process.env.AUTHLETE_ACCESS_TOKEN,
});
