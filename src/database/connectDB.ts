import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("poker-hands:database:connectDatabase");

const connectDatabase = (mongoDatabaseUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newDocument = { ...ret };
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument.__v;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;
        delete newDocument.passWord;
        return newDocument;
      },
    });

    mongoose.connect(mongoDatabaseUrl, (error) => {
      if (error) {
        debug(chalk.red(`Error connecting to database. ${error.message}`));
        reject(error);
        return;
      }

      debug(chalk.green("Connected to database"));
      resolve(true);
    });
  });

export default connectDatabase;
