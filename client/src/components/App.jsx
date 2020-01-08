import React from 'react';
import axios from 'axios';
import Post from './Views/Post.jsx';
import Posts from './Views/Posts.jsx';
import UserPosts from './Views/UserPosts.jsx';
import UserHood from './Views/UserHood.jsx';
import Neighborhoods from './Views/Neighborhoods.jsx';
import Neighbor from './Views/Neighbor.jsx';
import NavBar from './NavBar.jsx';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      currentPost: {},
      posts: [],
      comments: [],
      userPosts: [],
      view: 'posts',
      loggedIn: false,
      username: 'you',
      userId: '',
      neighborhood: 'Fountainbleu',
      hoodPosts: [],
      neighbors: [],
      neighbor: '',
      neighborPosts: [],
    };

    this.userLogin = this.userLogin.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.userSignUp = this.userSignUp.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getComments = this.getComments.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getHoodPosts = this.getHoodPosts.bind(this)
    this.getNeighbors = this.getNeighbors.bind(this)
    this.getNeighbor = this.getNeighbor.bind(this)
    this.getUserPosts = this.getUserPosts.bind(this);
    this.createComment = this.createComment.bind(this);
    this.changeCurrentPost = this.changeCurrentPost.bind(this);
  }

  componentDidMount() {
    // get local weather for menu widget
    this.getWeather()
      .then(weather => {
        this.setState({
          weather: weather.data.currently,
        });
      })
      .catch(error => {
        console.error('Failed to get weather', error);
      });
    // set posts state with all posts from db
    this.getAllPosts()
      .catch(error => {
        console.error('Failed to get posts', error);
      });
  }

  // function to get the loacl weather when app renders
  getWeather() {
    return axios.get('/weather')
      .then(response => response.data)
      .catch(error => console.log(error))
  }

  // function to get all posts from db to display in posts view
  getAllPosts() {
    return axios.get('/posts')
      .then(response => {
        this.setState({
          posts: response.data.data.reverse(),
        })
      })
      .catch(error => console.log(error))
  }

  // function to get all posts from the signed in user and set username state
  getUserPosts(username) {
    this.setState({
      username: username,
    })
    return axios.get(`/usersposts`, {
      params: {
        username,
      }
    })
      .then(response => {
        this.setState({
          userPosts: response.data.data.reverse(),
        })
      })
      .catch(error => console.log(error))
  }

  // function to load user info into state
  userLogin(username) {
    return axios.get(`/users/${username}`)
      .then(response => {
        const { userId, username, hood } = response.data.data[0];
        this.setState({
          userId,
          username,
          neighborhood: hood
        })
      })
      .catch(error => console.log(error))
  }

  // function to save new username to the db and set username state
  userSignUp(username, hood) {
    console.log(hood);
    this.setState({
      username: username,
      neighborhood: hood
    })
    return axios.post('/signup', {
      'username': username,
      hood,
    })
      .then(response => response)
      .catch(error => console.log(error))
  }

  // function to create a new post and save it to the db
  createPost(title, body, neighborhood, type) {
    return axios.post('/posts', {
      'title': title,
      'hoodName': neighborhood,
      'postType': type,
      'postBody': body,
      'username': this.state.username,
    })
      .then(response => response)
      .then(this.getAllPosts)
      .catch(error => console.log('failed to create post', error))
  }

  // function to create a new post
  createComment(postId, comment){
    return axios.post('/comments', {
      'postId': postId,
      'userId': this.state.userId,
      'commentBody': comment,
      'commentVotes': 0,
    })
      .then(response => response)
      .then(this.getComments(this.state.currentPost.id))
      .catch(error => console.log(error))
  }

  // function to store all current comments in state for main post view
  getComments(id){
    return axios.get('comments', {
      params: {
        postId: id
      }
    })
      .then(response => {
        this.setState({
          comments: response.data.data,
        })
      })
      .catch(error => console.log(error))
  }

  // get all users in a given neighborhood (except current user?)
  // called in MenuList when user clicks on My Neighborhood dropdown item
  getNeighbors() {
    const { neighborhood } = this.state;
    axios.get(`/neighbors/${neighborhood}`)
      .then((response) => {
        // filter response data to not include current logged in user
        const filteredResponse = response.data.filter((neighbor) => {
          return neighbor.username !== this.state.username;
        })
        // set the filtered neighbors onto state
        this.setState({
          neighbors: filteredResponse,
        })
      })
      // then call changeView to change the view
      .then(() => {
        this.changeView("userHood");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // get info for a specific neighbor to render in Neighbor component
  // called when user clicks on a neighbor name in the Neighborhood view
  getNeighbor(neighbor) {
    return axios.get(`/users/${neighbor}`)
      .then((response) => {
        const neighbor = response.data.data[0].username;
        this.setState({
          neighbor,
        })
        console.log(neighbor);
        axios.get(`/usersposts`, {
          params: {
            username: neighbor
          }
        })
          .then((response) => {
            const neighborPosts = response.data.data;
            this.setState({
              neighborPosts
            })
          })
          .then(() => {
            this.changeView('neighbor')
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // function to get all posts of a certain neighborhood
  getHoodPosts(hoodName){
    return axios.get('/neighborhoods/posts', {
      params: {
        hoodName: hoodName,
      }
    })
      .then(response => {
        this.setState({
          hoodPosts: response.data.data,
        })
      })
      .catch(error => console.log(error))
  }

  // function to change views
  changeView(option) {
    this.setState({
      view: option,
    });
  }

  // function to change currentPost state for main post view
  changeCurrentPost(post) {
    this.setState({
      currentPost: post
    })
  }
  
  // function to change loggedIn state to show user their posts and sign out button
  updateLogin() {
    this.setState({
      loggedIn: !this.state.loggedIn,
    });
  }
  
  render() {
    const { view, neighbors, neighbor, neighborPosts } = this.state;
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
        />
        {/* Post view changes base on state */}
        {(() => {
          switch (view) {
            // posts view shows all posts
            case 'posts':
              return <Posts 
                changeView={this.changeView}
                loggedIn={this.state.loggedIn} 
                createPost={this.createPost}
                posts={this.state.posts}
                changeCurrentPost={this.changeCurrentPost}
                getComments={this.getComments}
                />;
            // userPosts shows posts from the user once logged in
            case 'userPosts':
              return (
                loggedIn ? <UserPosts changeCurrentPost={this.changeCurrentPost} changeView={this.changeView} userPosts={this.state.userPosts}/> 
              : <Typography variant="h4" style={{ fontWeight: "bolder", textAlign: "center", color: "white" }}>
                  Please Login to see your posts!
                </Typography>)
            // userHood shows all users from a given neighborhood
            case 'userHood':
              return (
                neighbors.length > 0 ? <UserHood neighbors={neighbors} getNeighbor={this.getNeighbor} changeView={this.changeView} userPosts={this.state.userPosts} />
                  : <Typography variant="h4" style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                    You're the only one in the neighborhood...
                </Typography>)
            // neighbor shows a particular neighbor
            case 'neighbor':
              return (
                <Neighbor neighbor={neighbor} neighborPosts={neighborPosts} changeView={this.changeView} changeCurrentPost={this.changeCurrentPost}/>
              )
            // neighborhoods shows posts based on what neighborhood is selected
            case 'neighborhoods':
              return <Neighborhoods 
                changeView={this.changeView}
                getHoodPosts={this.getHoodPosts} 
                hoodPosts={this.state.hoodPosts}
                changeCurrentPost={this.changeCurrentPost}
                getComments={this.getComments}
                />;
            // post view shows the post clicked on with it's comments
            case 'post':
              return <Post
              changeView={this.changeView}
              currentPost={this.state.currentPost}
              createComment={this.createComment}
              comments={this.state.comments}
              loggedIn={this.state.loggedIn}
              />;
          }
        })()}
      </div>
    )
  }
}

export default App;