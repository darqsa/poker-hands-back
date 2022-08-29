import "./loadEnv";
import connectDB from "./database/connectDB";
import startServer from "./server/startServer";

const port = process.env.PORT ?? 4000;
const mongoDB = process.env.DB;

(async () => {
  try {
    await connectDB(mongoDB as string);
    await startServer(port as number);
  } catch {
    process.exit(1);
  }
})();
