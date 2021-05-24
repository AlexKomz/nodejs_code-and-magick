const {run} = require(`./server`);

const commands = [
  require(`./src/help`),
  require(`./src/version`),
  require(`./src/generate`),
  require(`./src/default`),
];

const args = process.argv.slice(2);

const param = args[0];

if (!param) {
  run();
} else {
  const command = param;
  commands.find((it) => it.isApplicable(command))
    .execute()
    .then((message) => console.log(message))
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
