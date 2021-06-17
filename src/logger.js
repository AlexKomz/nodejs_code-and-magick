const {createLogger, format, transports} = require(`winston`);
const {combine, timestamp} = format;

const logger = createLogger({
  level: `info`,
  format: format.json(),
  transports: [
    new transports.File({filename: `error.log`, level: `error`, format: combine(timestamp(), format.simple())}),
    new transports.File({filename: `combined.log`, format: combine(timestamp(), format.simple())})
  ]
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new transports.Console({
    level: `silly`,
    format: combine(timestamp(), format.simple())
  }));
}

module.exports = logger;
