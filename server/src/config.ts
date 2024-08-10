import { ValidationPipeOptions } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export default function () {
  const { env } = process;

  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return {
    PORT: env.PORT ?? 4000,
    DATABASE_URL: env.DATABASE_URL,
    VALIDATIONS_OPTIONS: {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    } as ValidationPipeOptions,
  };
}
