// const fs = require(`fs`);
const fs = require(`fs/promises`);
const colors = require(`colors`);
// const {promisify} = require(`util`);
const {generateEntity} = require(`./wizards-generator`);

const COMMAND = `--generate`;
const DEFAULT_PATH = `${process.cwd()}/wizards.json`;

// const writeFile = promisify(fs.writeFile);

const data = generateEntity();
const fileWriteOptions = {
  encoding: `utf-8`,
  mode: 0o644
};

module.exports = {
  isApplicable(command) {
    return command === COMMAND;
  },
  execute: async (path = DEFAULT_PATH) => {
    try {
      await fs.writeFile(path, JSON.stringify(data), fileWriteOptions);
    } catch (e) {
      throw new Error(colors.red(e.message));
    }

    return colors.green(`Data was generated into > ${path}`);
  }

  // execute(path = DEFAULT_PATH) {
  //   return writeFile(path, JSON.stringify(data))
  //     .catch((err) => {
  //       err.message = colors.red(err.message);
  //       return Promise.reject(err);
  //     })
  //     .then(() => Promise.resolve(colors.green(`Data was generated into > ${path}`)));
  // }

  // execute(path = DEFAULT_PATH) {
  //   return new Promise((resolve, reject) => {
  //     fs.writeFile(path, JSON.stringify(data), fileWriteOptions, (err) => {
  //       if (err) {
  //         err.message = colors.red(err.message);
  //         return reject(err);
  //       }
  //
  //       const message = `Data was generated into > ${path}`;
  //       return resolve(colors.green(message));
  //     });
  //   });
  // }
};
