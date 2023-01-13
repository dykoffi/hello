import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
}

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export default winston.createLogger(
    {
        levels: levels,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports: [
            new DailyRotateFile({ dirname: "logs", json: true, extension: ".log", filename: "data", utc: true, maxFiles: "3d" }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    myFormat
                )
            })
        ]
    }
)