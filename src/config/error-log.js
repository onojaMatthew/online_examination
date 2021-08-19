import winston from "winston";
import key from "./key";
require('winston-mongodb');

let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" || env === 'test' ) {
  db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.dev_db_name}`;
} else {
  db_url = `mongodb+srv://${key.prod_db_user}:${key.prod_db_password}@${key.prod_db_host}/${key.prod_db_name}`;
}

export default () => {
  winston.handleExceptions(
    new winston.transports.File( { filename: 'uncaughtException.log' } ),
    new winston.transports.Console( { colorize: true, prettyPrint: true } )
  )

  process.on( 'unhandledRejection', ( ex ) => {
    throw ex;
  } );

  winston.add( winston.transports.File, { filename: 'logFile.log' } );
  winston.add( winston.transports.MongoDB, {
    db: db_url,
    level: 'info'
  } );
}