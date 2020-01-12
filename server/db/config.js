const dotenv = require('dotenv');
dotenv.config();

// const { DB_HOST, DB_PASS, CLOUD_SQL_INSTANCE_CONNECTION_NAME} = process.env;

// const localMariaConfig = {
//   user: 'root',
//   host: 'localhost',
//   password: '',
//   database: 'nodela',
//   dialect: 'mariadb',
//   dialectOptions: {
//     connectionTimeout: 1000
//   }
// };

const sqlConfig = {
  user: 'root',
  host: 'localhost',
  password: '',
  dialect: 'mysql',
  database: 'nodela',
  // host: `/cloudsql/${CLOUD_SQL_INSTANCE_CONNECTION_NAME}`,
  // timestamps: false,
  // dialectOptions: {
  //   socketPath: `/cloudsql/${CLOUD_SQL_INSTANCE_CONNECTION_NAME}`
  // },
};

module.exports = {
  // localMariaConfig: localMariaConfig,
  sqlConfig: sqlConfig,
}
