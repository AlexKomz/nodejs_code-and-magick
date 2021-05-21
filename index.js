const commands = [
  require(`./src/help`),
  require(`./src/version`),
  require(`./src/generate`),
  require(`./src/default`),
];

const args = process.argv.slice(2);

const param = args[0];

if (!param) {
  console.log(`No params were provided`);
  process.exit(1);
}

const command = param;
commands.find((it) => it.isApplicable(command))
  .execute()
  .then((message) => console.log(message))
  .catch((message) => {
    console.error(message);
    process.exit(1);
  });
