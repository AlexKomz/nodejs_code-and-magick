const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `code-and-magick`
} = process.env;

const URL = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(URL, {useUnifiedTopology: true})
  .then((client) => client.db(DB_PATH))
  .catch((e) => {
    logger.error(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
