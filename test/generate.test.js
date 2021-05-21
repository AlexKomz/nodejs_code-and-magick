const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateCommand = require(`../src/generate`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Generate JSON command`, () => {
  it(`should fail non existing folder`, () => {
    const tempFileName = `${__dirname}/folder/test-file.json`;

    return generateCommand.execute(tempFileName)
      .then(() => assert.fail(`Path ${tempFileName} should not be available`))
      .catch((e) => assert.ok(e));
  });

  it(`should create new file`, () => {
    const tempFileName = `${__dirname}/test-file.json`;

    return generateCommand.execute(tempFileName)
      .then(access(tempFileName))
      .then(unlink(tempFileName));
  });
});
