import moment from 'moment';
import winston from 'winston';
const { format } = winston;

export default function loggerSystem(role: string, id: string, level: string, logPath:string, silentConsole: boolean){

    const utcISOstring = () => moment().utc().toISOString();
    // Log format
    const logFormat = format.printf((info:any) => {
        return [
        utcISOstring(),
        info.level.toUpperCase(),
        role,
        id,
        info.message
        ].join('|');
    });

    // File log rotation parameters
    const transportFileParams = (fileHeader: any) => ({
        filename: `${fileHeader}-%DATE%.log`,
        dirname: logPath, // default =>'.',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '15d'
    });
  
    // Set up logger
    const logger = winston.createLogger({
        level: level,
        format: format.combine(logFormat),
        transports: [
            /*
        new winston.transports.DailyRotateFile(
            transportFileParams('chainode')
        ),*/
        new winston.transports.Console({
            silent: silentConsole
        })
        ]
    });
  
    // Extend logger object to properly log additional arguments
    const origLog = logger.log;
    logger.log = function (level:string, ...args: any[]) {
        const parsedArgs = args.map(i => typeof(i) === 'object' ? JSON.stringify(i) : i).join(' ');
        origLog.apply(logger, [level, parsedArgs]);
    } as any;

    return logger;
}
