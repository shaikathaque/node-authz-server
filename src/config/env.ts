// esnures we have all required environment variables
import logger from './logger';

type NodeEnv = 'development' | 'test' | 'production';

interface Config {
  port: number;
  nodeEnv: NodeEnv;
}

const getConfig = (): Config => {
  const port = Number(process.env.PORT) || 3000;
  const nodeEnv = (process.env.NODE_ENV || 'development') as NodeEnv;

  // Simple validation
  if (isNaN(port)) {
    logger.error('PORT must be a number');
    process.exit(1);
  }

  if (!['development', 'test', 'production'].includes(nodeEnv)) {
    logger.error('NODE_ENV must be either development, test, or production');
    process.exit(1);
  }

  return {
    port,
    nodeEnv,
  };
};

export const config = getConfig();
