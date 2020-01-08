import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ListItemText, ListItemIcon, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PersonIcon from '@material-ui/icons/Person';
import SpaIcon from '@material-ui/icons/Spa';
import Weather from './Weather.jsx';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MenuList = ({ changeView, weatherIcon, weatherInfo, getNeighbors }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  //target clicked element on menu
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  //close menu when clicked off menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      {/* Drop down menu on NavBar*/}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => {changeView("posts")}}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => {changeView("userPosts")}}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="User" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => { getNeighbors() }}>
          <ListItemIcon>
            <SpaIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Neighborhood" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => { changeView("neighborhoods"); }}>
          <ListItemIcon>
            <HomeWorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Neighborhoods" />
        </StyledMenuItem>
        {/* Drop down weather widget */}
        <Weather weatherIcon={weatherIcon} weatherInfo={weatherInfo}/>
      </StyledMenu>

    </div>
  );
}

export default MenuList;