const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, DB_PASS, DB_PORT, CLOUD_SQL_INSTANCE_CONNECTION_NAME} = process.env;

// const localMariaConfig = {
//   user: 'root',
//   host: 'localhost',
//   password: '',
//   database: 'nodela',
//   dialect: 'mysql',
//   dialectOptions: {
//     connectionTimeout: 1000
//   }
// };

const sqlConfig = {
  user: 'root',
  host: DB_HOST,
  password: DB_PASS,
  dialect: 'mysql',
  database: 'nodela',
  // dialectOptions: {
  //   socketPath: `/cloudsql/${CLOUD_SQL_INSTANCE_CONNECTION_NAME}`
  // },
};

module.exports = {
  localMariaConfig: localMariaConfig,
  sqlConfig: sqlConfig,
}
