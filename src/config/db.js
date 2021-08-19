import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import winston from "winston";
import key from "../config/key";

let db_url;
const env = process.env.NODE_ENV || 'development';


if ( env === "development" ) {
  db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.dev_db_name}`;
} else if (env === "test") {
  db_url = `mongodb+srv://${key.test_db_user}:${key.test_db_password}@${key.test_db_host}/${key.test_db_name}`;
} else {
  db_url = `mongodb+srv://${key.db_user}:${key.db_password}@${key.db_host}/${key.db_name}`;
}
// mongodb+srv://gigAlpha:m0lHCAYrEccmirHX@cluster1.uzfdh.mongodb.net/gigAlphaUser
export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 45000,
  } )
    .then( () => {
      winston.info("Connection to database established");
    } )
    .catch( err => {
      winston.error(`Connection failed. ${ err.message }`);
    } );
  
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
}