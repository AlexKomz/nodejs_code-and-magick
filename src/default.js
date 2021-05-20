const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  isApplicable() {
    return true;
  },
  execute() {
    console.log(colors.rainbow(packageInfo.description));
    console.error(`To list possible options use '--help'`);
    process.exit(1);
  }
};
