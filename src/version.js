const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

const versionParts = packageInfo.version.split(`.`);
const VERSION_COMMAND = `--version`;

module.exports = {
  isApplicable(command) {
    return command === VERSION_COMMAND;
  },
  execute() {
    logger.info(`${colors.red(versionParts[0])}.${colors.green(versionParts[1])}.${colors.blue(versionParts[2])}`);
  }
};
