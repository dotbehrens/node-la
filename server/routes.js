const ctrl = require('./db/Controllers');
const axios = require('axios');
const { weatherKey } = require('./config');

/*
This file routes the client requests at a specific endpoint to a handling
function.
*/
module.exports = function (app, express) {
  //login to an account/get a single user
  app.post('/signup', ctrl.createUser);
  //get single user info
  app.get('/users/:username', ctrl.getSingleUser);
  //get all users
  app.get('/users', ctrl.getUsers);
  // get all users in a given neighrborhood/neighbors of the logged in user
  app.get('/neighbors/:hood', ctrl.getNeighbors);
  //create a post
  app.post('/posts', ctrl.createPost);
  // get all the posts
  app.get('/posts', ctrl.getPosts);
  //get all post by single user
  app.get('/usersposts', ctrl.usersPosts);
  //delete a post
  app.delete('/users:id/posts:id', ctrl.deletePost);
  //create comment
  app.post('/comments', ctrl.createComment);
  //get comments for a post
  app.get('/comments', ctrl.getComments);
  //get all posts for a neighborhood
  app.get('/neighborhoods/posts', ctrl.getNeighborhoodsPosts);

  //darksky current weather api request
  app.get('/weather', (req, res) => {
    axios.get(`https://api.darksky.net/forecast/${weatherKey}/29.9511,-90.0715`)
      .then((darkSky) => {
        darkSkyData = darkSky.data;
        res.status(200).json({ // Send 200 status upon success.
          status: 'success',
          data: darkSkyData,
          message: 'NOLA weather from darkSky'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
