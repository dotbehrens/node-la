'use strict';

const { sqlConfig } = require('./config');
const Sequelize = require('sequelize');
const UserModel = require('./Models/User');
const HoodModel = require('./Models/Hood');
const CommentModel = require('./Models/Comment');
const PostModel = require('./Models/Post');
const PostTypeModel = require('./Models/PostType');
const dotenv = require('dotenv');
dotenv.config();

const { DB_PASS } = process.env;

//connect to local mariadb using Sequelize methods
 const sequelize = new Sequelize('nodela', 'root', '', sqlConfig);

// connect to cloud sql db
//const sequelize = new Sequelize('nodela', 'root', DB_PASS, sqlConfig);


/*
Next, we instantiate our models by passing a sequelize instance and library itself to required model files.
 */

const User = UserModel(sequelize, Sequelize);
const Hood = HoodModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const PostType = PostTypeModel(sequelize, Sequelize);

/*
Associations are tricky, try to remember: 'the table belongs to the column'(posts belongs to user(Id))
source.hasOne(Target)
source.hasMany(Target[s])
target.belongsTo(Source),s

https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/

Set constraints to false to avoid errors
*/

//Set Table Associations before initialization, be mindful of order
User.hasMany(Post, {
  foreignKey: 'userPostId',
  constraints: false
});

User.hasMany(Post, {
  foreignKey: 'favePostId',
  constraints: false
});

Post.hasMany(Comment, {
  foreignKey: 'commentUsersId',
  constraints: false
});

User.hasMany(Comment, {
  foreignKey: 'username',
  constraints: false
});

Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

//Sync the Models to construct the database tables
User.sync({ force: true })
  .then(() => console.log('Users synced!'));

Hood.sync({ force: true })
  .then(() => console.log('Hood synced!'));

Post.sync({ force: true })
  .then(() => console.log('Post synced!'));

PostType.sync({ force: true })
  .then(() => console.log('PostType synced!'));

Comment.sync({ force: true })
  .then(() => console.log('Comments synced!'));

//Confirm the connection to the db
sequelize.authenticate()
  .then(() => console.log('Connection to the database has been established successfully.'))
  .catch(err => console.log('Database Connection Error', err));


module.exports = {
  User,
  Comment,
  Post,
  Hood,
  PostType
};