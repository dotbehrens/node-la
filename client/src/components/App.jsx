import React from 'react';
import axios from 'axios';
import Post from './Views/Post.jsx';
import Posts from './Views/Posts.jsx';
import UserPosts from './Views/UserPosts.jsx';
import UserProfile from './Views/UserProfile.jsx';
import Neighborhood from './Views/Neighborhood.jsx';
import Neighborhoods from './Views/Neighborhoods.jsx';
import Neighbor from './Views/Neighbor.jsx';
import NavBar from './NavBar.jsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      currentPost: {},
      posts: [],
      comments: [],
      userPosts: [],
      view: "posts",
      loggedIn: false,
      username: "you",
      userId: "",
      neighborhood: "Fountainbleu",
      hoodPosts: [],
      neighbors: [],
      neighbor: "",
      neighborPosts: [],
      favorites: [],
    };

    this.userLogin = this.userLogin.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.userSignUp = this.userSignUp.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getComments = this.getComments.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.updateUserBio = this.updateUserBio.bind(this);
    this.updateUserHood = this.updateUserHood.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getHoodPosts = this.getHoodPosts.bind(this);
    this.getNeighbors = this.getNeighbors.bind(this);
    this.getNeighbor = this.getNeighbor.bind(this);
    this.getPostUsername = this.getPostUsername.bind(this);
    this.getUserPosts = this.getUserPosts.bind(this);
    this.createComment = this.createComment.bind(this);
    this.changeCurrentPost = this.changeCurrentPost.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    // get local weather for menu widget
    this.getWeather()
      .then(weather => {
        this.setState({
          weather: weather.data.currently
        });
      })
      .catch(error => {
        console.error("Failed to get weather", error);
      });
    // set posts state with all posts from db
    this.getAllPosts().catch(error => {
      console.error("Failed to get posts", error);
    });
  }

  toggleFavorite() {
    console.log('i hate plants')
    // axios
    //   .patch("/favorites", {
    //     postId: postId,
    //     neighborName: neighborName
    //   })
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(err => {
      //   console.log("err with toggle favorite", err);
      // });
  }

  // function to get the loacl weather when app renders
  getWeather() {
    return axios
      .get("/weather")
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // function to get all posts from db to display in posts view
  getAllPosts() {
    return axios
      .get("/posts")
      .then(response => {
        console.log(response.data.data);
        const posts = response.data.data;
        // get usernames from db
        this.getPostUsername(posts)
          .then(responses => {
            console.log(responses);
            // grab just the usernames from each response,
            // reverse them,
            // and add them to the state posts prop
            const usernames = [];
            responses.forEach(response => {
              usernames.push(response.data.data[0].username);
            });
            console.log(usernames);
            // for each post, add username as prop

            posts.forEach((post, index) => {
              post.username = usernames[index];
            });
            console.log(posts);
            // then set posts as state
            this.setState({
              posts: posts.reverse()
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  // retrieve usernames for each post added to state from getAllPosts
  getPostUsername(posts) {
    const users = posts.map((post) => {
      return axios.get(`/posts/user/${post.userId}`);
    });
    return Promise.all(users);
  }

  // function to get all posts from the signed in user and set username state
  getUserPosts(username) {
    this.setState({
      username: username
    });
    return axios
      .get(`/usersposts`, {
        params: {
          username
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          userPosts: response.data.data.reverse()
        });
      })
      .catch(error => console.log(error));
  }

  // function to load user info into state
  userLogin(username) {
    return axios
      .get(`/users/${username}`)
      .then(response => {
        const { userId, username, hood } = response.data.data[0];
        this.setState({
          userId,
          username,
          neighborhood: hood
        });
      })
      .catch(error => console.log(error));
  }

  // function to save new username to the db and set username state
  userSignUp(username, hood) {
    console.log(hood);
    this.setState({
      username: username,
      neighborhood: hood
    });
    return axios
      .post("/signup", {
        username: username,
        hood
      })
      .then(response => response)
      .catch(error => console.log(error));
  }

  // function to create a new post and save it to the db
  createPost(title, body, neighborhood, type) {
    return axios
      .post("/posts", {
        title: title,
        hoodName: neighborhood,
        postType: type,
        postBody: body,
        username: this.state.username
      })
      .then(response => response)
      .then(this.getAllPosts)
      .catch(error => console.log("failed to create post", error));
  }

  // function to create a new post
  createComment(postId, comment) {
    return axios
      .post("/comments", {
        postId: postId,
        userId: this.state.userId,
        commentBody: comment,
        commentVotes: 0
      })
      .then(response => response)
      .then(this.getComments(this.state.currentPost.id))
      .catch(error => console.log(error));
  }

  // function to store all current comments in state for main post view
  getComments(id) {
    return axios
      .get("comments", {
        params: {
          postId: id
        }
      })
      .then(response => {
        this.setState({
          comments: response.data.data
        });
      })
      .catch(error => console.log(error));
  }

  // get all users in a given neighborhood (except current user?)
  // called in MenuList when user clicks on My Neighborhood dropdown item
  getNeighbors() {
    const { neighborhood } = this.state;
    axios
      .get(`/neighbors/${neighborhood}`)
      .then(response => {
        // filter response data to not include current logged in user
        const filteredResponse = response.data.filter(neighbor => {
          return neighbor.username !== this.state.username;
        });
        // set the filtered neighbors onto state
        this.setState({
          neighbors: filteredResponse
        });
      })
      // then call changeView to change the view
      .then(() => {
        this.changeView("neighborhood");
      })
      .catch(err => {
        console.log(err);
      });
  }

  // get info for a specific neighbor to render in Neighbor component
  // called when user clicks on a neighbor name in the Neighborhood view
  getNeighbor(neighbor) {
    return axios
      .get(`/users/${neighbor}`)
      .then(response => {
        debugger
        const neighbor = response.data.data[0].username;
        this.setState({
          neighbor
        });
        console.log(neighbor);
        axios
          .get(`/usersposts`, {
            params: {
              username: neighbor
            }
          })
          .then(response => {
            debugger;
            const neighborPosts = response.data.data;
            console.log(neighborPosts);
            this.setState({
              neighborPosts
            });
          })
          .then(() => {
            this.changeView("neighbor");
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // function to get all posts of a certain neighborhood
  getHoodPosts(hoodName) {
    return axios
      .get("/neighborhoods/posts", {
        params: {
          hoodName: hoodName
        }
      })
      .then(response => {
        this.setState({
          hoodPosts: response.data.data
        });
      })
      .catch(error => console.log(error));
  }

  // function to change views
  changeView(option) {
    this.setState({
      view: option
    });
  }

  // function to change currentPost state for main post view
  changeCurrentPost(post) {
    this.setState({
      currentPost: post
    });
  }

  // function to change loggedIn state to show user their posts and sign out button
  updateLogin() {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }

  // allows user to add and change their bio
  updateUserBio(newBio) {
    const { username } = this.state;
    axios
      .post("/users/bio", { username, newBio })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // allows user to change their neighborhood
  updateUserHood(newHood) {
    const { username } = this.state;
    axios
      .patch("users/hood", { username, newHood })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleFavorite(postId, neighborName){
    axios.patch('/favorites', {
      postId: postId,
      neighborName: neighborName
  })
    .then(response => {
      alert("This post has been faved!!");
    })
    .catch(err => {
      console.log('err with toggle favorite', err)
    })

    
  }

  getFavorites(){
    axios.get('/favorites')
    .then(response => {
      console.log(response)
    })
    .then(this.setState({favorites: response}))
    .catch(err => {
      console.log('err with get favorites' , err)
    })
  }


  render() {
    const {
      view,
      neighbors,
      neighbor,
      neighborhood,
      neighborPosts,
      username
    } = this.state;
    const { loggedIn } = this.state;
    return (
      <div>
        {/* NavBar component for all navigation and logging in */}
        <NavBar
          loggedIn={this.state.loggedIn}
          weatherInfo={this.state.weather}
          weatherIcon={this.state.weather.icon}
          changeView={this.changeView}
          updateLogin={this.updateLogin}
          userSignUp={this.userSignUp}
          userLogin={this.userLogin}
          getUserPosts={this.getUserPosts}
          getNeighbors={this.getNeighbors}
          getFavorites={this.getFavorites}
        />
        {/* Post view changes base on state */}
        {(() => {
          switch (view) {
            // posts view shows all posts
            case "profile":
              return loggedIn ? (
                <UserProfile
                  neighborhood={neighborhood}
                  updateUserBio={this.updateUserBio}
                  updateUserHood={this.updateUserHood}
                />
              ) : (
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", color: "white" }}
                >
                  Please log in to see your profile
                </Typography>
              );
            case "posts":
              return loggedIn ? (
                <Posts
                  changeView={this.changeView}
                  loggedIn={this.state.loggedIn}
                  createPost={this.createPost}
                  posts={this.state.posts}
                  changeCurrentPost={this.changeCurrentPost}
                  getComments={this.getComments}
                  username={username}
                />
              ) : (
                <div>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bolder",
                      textAlign: "center",
                      color: "white",
                      marginTop: 20
                    }}
                  >
                    Welcome to NodeLA!
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bolder",
                      textAlign: "center",
                      color: "white"
                    }}
                  >
                    Please log in.
                  </Typography>
                </div>
              );
            // userPosts shows posts from the user once logged in
            case "userPosts":
              return loggedIn ? (
                <UserPosts
                  changeCurrentPost={this.changeCurrentPost}
                  changeView={this.changeView}
                  userPosts={this.state.userPosts}
                />
              ) : (
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: "bolder",
                    textAlign: "center",
                    color: "white"
                  }}
                >
                  Please log in to see your posts!
                </Typography>
                    )
            // Neighborhood shows all users from a given neighborhood
            case "neighborhood":
              return loggedIn ? (
                neighbors.length > 0 ? (
                  <Neighborhood
                    neighbors={neighbors}
                    neighborhood={neighborhood}
                    getNeighbor={this.getNeighbor}
                    changeView={this.changeView}
                    userPosts={this.state.userPosts}
                  />
                ) : (
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                      marginTop: 20
                    }}
                  >
                    You're the only one in the neighborhood...
                  </Typography>
                )
              ) : (
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "bolder",
                    textAlign: "center",
                    color: "white"
                  }}
                >
                  Please log in to see your neighborhood
                </Typography>
              );
            // neighbor shows a particular neighbor
            case "neighbor":
              return loggedIn ? (
                neighborPosts.length > 0 ? (
                  <Neighbor
                    neighbor={neighbor}
                    getNeighbors={this.getNeighbors}
                    neighborPosts={neighborPosts}
                    changeView={this.changeView}
                    changeCurrentPost={this.changeCurrentPost}
                    toggleFavorite={this.toggleFavorite}
                  />
                ) : (
                  <div>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        color: "white"
                      }}
                    >
                      Looks like {neighbor} doesn't have any posts yet
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        cursor: "pointer",
                        width: "auto",
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onClick={() => this.getNeighbors()}
                    >
                      Back to your neighborhood
                    </Button>
                  </div>
                )
              ) : (
                this.changeView("neighborhood")
              );
            // neighborhoods shows posts based on what neighborhood is selected
            case "neighborhoods":
              return (
                <Neighborhoods
                  changeView={this.changeView}
                  getHoodPosts={this.getHoodPosts}
                  hoodPosts={this.state.hoodPosts}
                  changeCurrentPost={this.changeCurrentPost}
                  getComments={this.getComments}
                />
              );
            // post view shows the post clicked on with it's comments
            case 'post':
              return <Post
              changeView={this.changeView}
              currentPost={this.state.currentPost}
              createComment={this.createComment}
              comments={this.state.comments}
              loggedIn={this.state.loggedIn}
              />;
              case 'favorites':
                return (loggedIn ? <Posts 
                  favorites={this.state.favorites}
                  changeView={this.changeView}
                  loggedIn={this.state.loggedIn} 
                  createPost={this.createPost}
                  posts={this.state.posts}
                  changeCurrentPost={this.changeCurrentPost}
                  getComments={this.getComments}
                  username={username}
                  />
                  : <div>
                      <Typography variant="h5" style={{ fontWeight: "bolder", textAlign: "center", color: "white", marginTop: 20 }}>
                        Welcome to NodeLA!
                      </Typography>
                      <Typography variant="h6" style={{ fontWeight: "bolder", textAlign: "center", color: "white"}}>
                      Please log in.
                      </Typography>
                    </div>
                )
          }
        })()}
      </div>
    );
  }
}

export default App;