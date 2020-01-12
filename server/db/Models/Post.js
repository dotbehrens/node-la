module.exports = (sequelize, type) => {
  return sequelize.define('post', {
    title: {
      type: type.STRING,
      allowNull: false
    },
    postHoodId: {
      type: type.INTEGER,
      allowNull: false,
    },
    postTypeId: {
      type: type.INTEGER,
      allowNull: false,
    },
    postBody: {
      type: type.TEXT,
      allowNull: false,
    },
    postVotes: {
      type: type.INTEGER,
      allowNull: false
    },
    favedStatus: {
      type: type.BOOLEAN,
      allowNull: true
    }
  });
};