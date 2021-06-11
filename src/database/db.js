const {MongoClient} = require(`mongodb`);

const URL = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(URL)
  .then((client) => client.db(`code-and-magick`))
  .catch((e) => {
    console.error(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
