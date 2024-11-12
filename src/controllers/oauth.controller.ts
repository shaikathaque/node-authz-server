import { Request, Response } from 'express';
import { authleteClient } from '../config/authlete';
import logger from '../config/logger';

export const authorize = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryString = req.url.split('?')[1] || '';

    logger.info('Authorization request received', {
      fullUrl: req.url,
      queryString,
      queryParams: req.query,
    });

    const parameters = {
      parameters: queryString,
      clientId: req.query.client_id as string,
    };

    logger.debug('Sending to Authlete:', parameters);

    const response = await authleteClient.authorizationRequest(parameters);

    logger.debug('Authlete response received:', response);

    res.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : undefined;

    logger.error('Authorization failed:', {
      error: errorMessage,
      stack: errorDetails,
      requestUrl: req.url,
      queryParams: req.query,
    });

    res.status(500).json({
      error: 'Authorization failed',
      details: errorMessage,
    });
  }
};
