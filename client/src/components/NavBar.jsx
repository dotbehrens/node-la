import React from 'react';
import MenuList from './MenuList.jsx';
import Login from './Login.jsx'
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';
import Logo from './images/Logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, #43a047 30%, #00796b 90%)',
  },
  img: {
    margin: 'auto',
    maxWidth: '170px',
    maxHeight: '170px',
  },
}));

const NavBar = ({ changeView, updateLogin, loggedIn, weatherIcon, weatherInfo, userSignUp, getUserPosts, userLogin, getNeighbors }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {/* menu button */}
          <MenuList changeView={changeView} weatherIcon={weatherIcon} weatherInfo={weatherInfo} getNeighbors={getNeighbors}/>
          {/* app title */}
          <img className={classes.img} src={Logo} alt="Logo" />
          {/* Login button (changes to sign out button when logged in) */}
          <div variant="contained" color="secondary"> 
            {loggedIn ? <Button variant="contained" color="secondary" onClick={updateLogin}> Sign Out </Button>
              : <Login updateLogin={updateLogin} userLogin={userLogin} userSignUp={userSignUp} getUserPosts={getUserPosts}/>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;