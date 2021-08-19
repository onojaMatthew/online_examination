import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env")});

export default ({
  jwtPrivateKey: "unsecureKey",
  prod_db_name: process.env.PROD_DB_NAME,
  dev_db_name: process.env.DEV_DB_NAME,
  dev_db_user: process.env.DEV_DB_USER,
  dev_db_host: process.env.DEV_DB_HOST,
  dev_db_password: process.env.DEV_DB_PASSWORD,
  test_db_name: process.env.TEST_DB_NAME,
  test_db_host: process.env.TEST_DB_HOST,
  test_db_password: process.env.TEST_DB_PASSWORD,
  test_db_user: process.env.TEST_DB_USER,
  prod_db_name: process.env.PROD_DB_NAME,
  prod_db_host: process.env.PROD_DB_HOST,
  prod_db_password: process.env.PROD_DB_PASSWORD,
  prod_db_user: process.env.PROD_DB_USER,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  account_sid: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  PORT: process.env.PORT,
});
  
    
   