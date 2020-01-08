module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    username: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    hood: {
      type: type.STRING,
      allowNull: true,
      unique: false
    }
  });
};