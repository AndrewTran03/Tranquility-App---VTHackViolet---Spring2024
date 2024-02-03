import logger, { Logger } from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("logLevel");

/*
From Chat-GPT: 
For the logging library for Node.js called Pino, it has different log levels that 
represent the severity or importance of log messages. The log levels in Pino, in 
increasing order of severity, are:

- trace: Used for very detailed and fine-grained debugging information.
- debug: More detailed information than trace, typically used for debugging.
- info: General information about the application's state.
- warn: Indicates potential issues or situations that may need attention.
- error: Indicates errors that the application can recover from.
- fatal: Represents critical errors that lead to the termination of the application.
*/
const log: Logger = logger({
  level: level,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  },
  base: { pid: false },
  timestamp: () => `, "time":"${dayjs().format()}"`
});

export default log;
