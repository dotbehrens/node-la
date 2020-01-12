const { User, Post, PostType, Hood, Comment } = require('./index');
const parser = require('body-parser');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const app = express(feathers());

// ! USER CRUD
//create & save a user to the db
// !CREATE USER
const createUser = function (req, res, next) {
  const { username, hood, id } = req.body; // Grab username, id, and hood from req body
  User.create({
    username,
    hood,
    id,
  })
    .then((data) => {
      res.status(201).json({ // Send 201 status upon success.
        status: 'success',
        data: data,
        message: `POSTED ${username} TO DATABASE`
      });
    })
    .catch(err => {
      res.sendStatus(400);
      console.log('There was an error adding the user to the db', err);
      return next();
    });
};

//user login function
// ! READ
const getSingleUser = function (req, res, next) {
  const username = req.params.username;
  User.findOrCreate({
    where: {
      username: username
    }
  })
    .then((response) => { // Find the user with the given auth0_id.
      res.status(200).json({ // Send 200 status upon success.
        status: 'success',
        data: response,
        message: 'Here\'s that user you asked for'
      });
    })
    .catch(function (err) {
      res.sendStatus(400);
      console.log('Unfortunately I was unable to find that user\'s information', err);
      return next();
    });
};

// get username from user id
const getSingleUserById = function (req, res, next) {
  const id = req.params.userId;
  console.log(id);
  User.findOrCreate({
    where: {
      id: id
    }
  })
    .then((response) => { // Find the user with the given auth0_id.
      res.status(200).json({ // Send 200 status upon success.
        status: 'success',
        data: response,
        message: 'Here\'s that username you asked for'
      });
    })
    .catch(function (err) {
      res.sendStatus(400);
      console.log('Unfortunately I was unable to find that user\'s information', err);
      return next();
    });
};


//get all users
const getUsers = function (req, res, next) {
  User.findAll({})
    .then((users) => {
      res.status(200);
      res.send(JSON.stringify({
        status: 'success',
        data: users,
        message: 'Here are all the users!'
      }));
      return next();
    })
    .catch(() => {
      res.status(400);
      return next();
    });
};

// get all users from a given neighborhood
const getNeighbors = (req, res, next) => {
  const { hood } = req.params
  User.findAll({ where: { hood: hood } })
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((error) => {
      console.log(error);
    })
}

// get all faves from a user
const getFaves = (req, res, next) => {
// find our user
  const id = req.params.userId;
  console.log(id);
  User.findOrCreate({
    where: {
      id: id
    }
  }).
  then((user) => {

  })
}



//Update User
//! UPDATE
const updateUser = function (req, res, next) {
  User.update({})
    // username: newUsername,
    // }, {
    // where: {
    //   id: id
    // }
    .then((newName) => {
      res.status(201);
      console.log(`This username has been updated to ${newName}`);
    });
  return next();
};

// update user bio
const updateUserBio = function (req, res, next) {
  const { newBio, username } = req.body;
  User.update(
    { bio: newBio},
    { where: { username }}
  )
  .then(() => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(error);
  })
  // next();
}

// update user hood
const updateUserHood = function (req, res, next) {
  const { newHood, username } = req.body;
  User.update(
    { hood: newHood },
    { where: { username } }
  )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    })
  next();
}

//! DELETE USER
const deleteUser = function (req, res, next) {
  User.destroy({
    where: {
      id: id,
      username: username
    }
  })
    .then(() => {
      res.status(201);
      console.log('This user has been deleted');
    });
};

//! POST CRUD

//! CREATE POST
const createPost = function (req, res) {
  //todo
  //comment that in
  const { username, hoodName, postBody, postType, title } = req.body;
  let postTypeId = null;
  let postHoodId = null;
  let postUserId = null;
  //comment this line out
  let upOrDown = 'up';
  Hood.findOrCreate({
    where:{
    hoodName: hoodName,
    upOrDown: upOrDown,
  }})
  // .catch((err)=>{ err })
  .then((tuple) => {
    const createdHoodObj = tuple[0];
    console.log(createdHoodObj);
    const newHoodObj = tuple[1];
    console.log(newHoodObj);
    postHoodId = createdHoodObj.dataValues.id;
    return User.findOrCreate({
      where:{
        username: username,
    }})
  })
  // .catch((err)=>{err; debugger;})
    //should check for use userid
  .then((tuple) => {
    const createdUserObj = tuple[0];
    const newUserObj = tuple[1];
    postUserId = createdUserObj.dataValues.id;
    return PostType.findOrCreate({
      where: {
        helpOrGen: postType,
      }
    })
  })
  .then((tuple) => {
    const createdPostTypeObj = tuple[0];
    const newPostTypeObj = tuple[1];
    postTypeId = createdPostTypeObj.dataValues.id;
    return Post.create({
      title: title,
      postHoodId: postHoodId,
      postTypeId: postTypeId,
      postBody: req.body.postBody,
      postVotes: 0,
      userId: postUserId,
    });
  })
  // .then((data) => {
  //   data;
  //   res.status(201)
  //     .json({
  //       status: 'success',
  //       data: data,
  //       message: 'Created a new Post!'
  //     });
  // })
  .catch((err) => {
    res.status(400);
    console.log('There was an error creating that post!', err);
    return next();
  });
};

const getSinglePost = function (req, res) {
  debugger;
  const id = req.params.postId;
  Post.findOne({
    where: {
      title: title,
      id: id
    }
  })
    .then((singlePost) => {
      res.status(200).json({
        data: singlePost
      });
    })
    .catch(err => res.sendStatus(400));
};

//get all the posts or comments from the db based on user id
const usersPosts = function (req, res, next) {
  const { username } = req.query;
  User.findOne({where:{username : username}})
  .then((user)=>{
    id = user.dataValues.id;
    return Post.findAll({ where: { userId: id } })
  })
  .then((response)=>{
    response;
    res.status(200);
    res.send(JSON.stringify({
      status: 'success',
      data: response,
      message: 'Here are all that user\'s posts!'
    }));
    return next();
  })
  .catch((error) => {
    console.log(error);
  })
}
//! READ POST
const getPosts = function (req, res, next) {
  const {userId} = req.query;
  Post.findAll()
    .then((response) => {
      res.status(200);
      res.send(JSON.stringify({
        status: 'success',
        data: response,
        message: 'Here are all the posts!'
      }));
      return next();
    })
    .catch(err => {
      res.sendStatus(400);
      console.log(err);
      return next();
    });
};

const getFavePosts = function (req, res, next) {
  const {
    userId
  } = req.query;
  Post.findAll({
    where: {
      userId: id
    }
  })
    .then((response) => {
      res.status(200);
      res.send(JSON.stringify({
        status: 'success',
        data: response,
        message: 'Here are all the posts!'
      }));
      return next();
    })
    .catch(err => {
      res.sendStatus(400);
      console.log(err);
      return next();
    });
};

//!UPDATE POST
const updatePost = function (req, res, next) {
  console.log(req.body);
  Post.update({
    favedStatus: true,
    }, {
    where: {
      id: req.body.postId
    }
  })
    .then((newPost) => {
      res.status(201).send();
      // console.log(`This post has been updated to ${newPost}`);
    })
    .catch(err => {
      res.sendStatus(400);
      console.log(err);
      return next();
    });
};

//delete a specific post by iD
//!DELETE POST
const deletePost = function (req, res, next) {
  Post.destroy({
    where: {
      id: id,
    }
  })
    .then(() => {
      res.status(201);
      console.log('This post has been deleted');
    });
};

//COMMENT CRUD
// ! CREATE COMMENT
const createComment = function (req, res) {
  const {postId, userId, commentBody} =req.body
  Comment.create({
    postId: postId,
    commentUserId: userId,
    commentBody: commentBody,
    commentVotes: 0
  })
    .then((response) => {
      res.status(201).json({
        status: 'success',
        data: response.data,
        message: 'Created a new Comment!'
      });
    })
    .catch((err) => {
      debugger;
      res.status(400);
      console.log('There was an error creating that comment!'), err;
      return next();
    });
};

// ! READ COMMENT
const getComments = function (req, res, next) {
  const {postId} = req.query;
  Comment.findAll({
    //where
    where:{
      postId: postId,
    }
  })
    .then((response) => {
      res.status(200);
      res.send(JSON.stringify({
        status: 'success',
        data: response,
        message: 'Here are all that post\'s comments!'
      }));
      return next();
    })
    .catch(err => {
      res.sendStatus(400);
      console.log(err);
      return next();
    });
};

// ! UPDATE COMMENT
const updateComment = function (req, res, next) {
  Comment.update({
    // title: newTitle,
    // postBody: newPostBody,
    // }, {
    // where: {
    //   id: postId
    // }
  })
    .then((newPost) => {
      res.status(201);
      console.log(`This post has been updated to ${newPost}`);
    });
};


//! DELETE COMMENT
const deleteComment = function (req, res, next) {
  Comment.destroy({
    where: {
      id: id,
      username: username
    }
  })
    .then(() => {
      res.status(201);
      console.log('This user has been deleted');
    });
};

const getNeighborhoodsPosts = function(req, res, next) {
  const { hoodName } = req.query;
  let postHoodId = null;
  Hood.findOne({
    where: {
      hoodName: hoodName,
  }})
  // .catch((err) => { debugger; })
  .then((hood) => {
      // debugger;
      postHoodId = hood.dataValues.id;
      return Post.findAll( {where: {
        postHoodId: postHoodId
      }})
  })
  .then((posts)=>{
    res.send(posts);
    posts;
    debugger;
  })
  .catch((err)=>{
   
  })
}


module.exports = {
  getFaves,
  getFavePosts,
  getNeighborhoodsPosts,
  createUser,
  getSingleUser,
  getSingleUserById,
  getUsers,
  updateUserBio,
  updateUserHood,
  getNeighbors,
  updateUser,
  deleteUser,
  createPost,
  getSinglePost,
  getPosts,
  updatePost,
  deletePost,
  createComment,
  getComments,
  updateComment,
  deleteComment,
  usersPosts
};