const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

module.exports = {
  isApplicable() {
    return true;
  },
  execute() {
    logger.info(colors.rainbow(packageInfo.description));
    logger.error(`To list possible options use '--help'`);
    process.exit(1);
  }
};
