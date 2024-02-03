import mongoose from "mongoose";
import config from "config";
import log from "./logger";
import { MongoClient } from "mongodb";

async function ensureConnectionToMongoDatabase() {
  const dbUri = config.get<string>("mongoDatabaseUri");

  try {
    log.info(dbUri);
    await mongoose.connect(dbUri);
    log.info("Sucessfully initiated connection to MongoDB");
  } catch (e) {
    log.error("Failed to connect to MongoDB. Exiting now...");
    process.exit(1);
  }
}

export { ensureConnectionToMongoDatabase };
