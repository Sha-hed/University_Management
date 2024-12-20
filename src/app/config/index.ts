import dotenv from 'dotenv';
import path from 'path';

// ('dotenv').config({ path: '/custom/path/to/.env' })

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcryptSalt : process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  NODE_ENV : process.env.NODE_ENV,
  jwt_secret: process.env.JWT_ACCESS_SECRET
};
