/**
 * Key for the auth cookie.
 */
export const CFP_COOKIE_KEY = "CFP-Auth-Key";

/**
 * Max age of the auth cookie in seconds.
 * 4 weeks
 */
export const CFP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 4;

/**
 * Paths that don't require authentication.
 * The /cfp_login path must be included.
 */
export const CFP_ALLOWED_PATHS = ["/cfp_login"];
