const colors = require(`colors`);
const logger = require(`./logger`);

const HELP_COMMAND = `--help`;
const VERSION_COMMAND = `--version`;

module.exports = {
  isApplicable(command) {
    return command === HELP_COMMAND;
  },
  execute() {
    logger.info(`This application does nothing. Accessible params:
${colors.italic.gray(HELP_COMMAND)}    - prints this info;
${colors.italic.gray(VERSION_COMMAND)} - prints application version;`);
  }
};
