export const MONGO_URL: string = (() => {
  if (!process.env.MONGO_URL) {
    throw new Error("❌ MONGO_URL is not defined in environment variables");
  }
  return process.env.MONGO_URL;
})();


export const JWT_SECRET: string = (() => {
  if (!process.env.JWT) {
    throw new Error(" JWT secret is not defined");
  }
  return process.env.JWT;
})();

export const BASE_URL: string = (() => {
  if (!process.env.BASE_URL) {
    throw new Error(" BASE_URL is not defined");
  }
  return process.env.BASE_URL;
})();
