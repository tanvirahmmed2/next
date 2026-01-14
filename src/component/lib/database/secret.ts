export const MONGO_URL: string = (() => {
  if (!process.env.MONGO_URL) {
    throw new Error("❌ MONGO_URL is not defined in environment variables");
  }
  return process.env.MONGO_URL;
})();
