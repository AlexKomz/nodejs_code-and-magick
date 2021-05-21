const fs = require(`fs`);
const colors = require(`colors`);
const {generateEntity} = require(`./generator/wizards-generator`);

const COMMAND = `--generate`;
const DEFAULT_PATH = `${process.cwd()}/wizards.json`;

const data = generateEntity();
const fileWriteOptions = {
  encoding: `utf-8`,
  mode: 0o644
};

module.exports = {
  isApplicable(command) {
    return command === COMMAND;
  },
  execute(path = DEFAULT_PATH) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(data), fileWriteOptions, (err) => {
        if (err) {
          err.message = colors.red(err.message);
          return reject(err);
        }

        const message = `Data was generated into > ${path}`;
        return resolve(colors.green(message));
      });
    });
  }
};
