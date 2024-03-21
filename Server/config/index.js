import dotenv from "dotenv";
dotenv.config();

export const {
  DEBUG_MODE,
  DB_URL,
  JWT_SECRET,
  JWT_LINK,
  APP_URL,
  LINK_URL,
  USER,
  PASSWORD,
  ZEGO_APP_ID,
  ZEGO_SERVER_ID,
} = process.env;
