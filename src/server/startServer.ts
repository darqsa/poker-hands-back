import chalk from "chalk";
import Debug from "debug";
import app from ".";

const debug = Debug("poker-hands:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(`Error conecting to database: ${error}`);
      reject(error);
    });
  });

export default startServer;
