import dotenv from "dotenv";

dotenv.config();

export const BASE_PATH = process.env.BASE_PATH || "/";

export const getSiteUrl = () => {
  if (process.env.SITE_DOMAIN) return process.env.SITE_DOMAIN;
  if (process.env.CF_PAGES_BRANCH) {
    return new URL(BASE_PATH, process.env.CF_PAGES_URL).toString();
  }
  return undefined;
};
