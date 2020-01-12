const dotenv = require('dotenv');
dotenv.config();

// const { DB_HOST, DB_PASS, CLOUD_SQL_INSTANCE_CONNECTION_NAME} = process.env;

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
  host: 'localhost',
  password: '',
  dialect: 'mysql',
  database: 'nodela',
<<<<<<< HEAD
=======
  // host: `/cloudsql/${CLOUD_SQL_INSTANCE_CONNECTION_NAME}`,
  // timestamps: false,
>>>>>>> 4ef597972d438324a72bb2f450721c8e70a7d89d
  // dialectOptions: {
  //   socketPath: `/cloudsql/${CLOUD_SQL_INSTANCE_CONNECTION_NAME}`
  // },
};

module.exports = {
  // localMariaConfig: localMariaConfig,
  sqlConfig: sqlConfig,
}
