import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is missing.`);
  }
  return value || defaultValue!;
};

export const SECRETS = {
  JOB_BOARD_DB_PATH: getEnvVar('JOB_BOARD_DB_PATH'),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
};
