import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogActions, DialogContent, 
          DialogTitle, Button, Select, FormControl, 
          InputLabel, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const Login = ({ updateLogin, userSignUp, userLogin, getUserPosts }) => {
  const classes = useStyles();
  //user react hooks to set temp state of username
  const [open, setOpen] = useState(false);
  const [hood, setHood] = useState('');
  const [usernameValue, setUsernameValue] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handle state change of neighborhood type
  const handleHoodChange = event => {
    setHood(event.target.value);
  };

  // console.log(usernameValue);

  return (
    <div className={classes.root}>
          {/* Login button */}
          <Button variant="contained" color="secondary" onClick={handleOpen}> Login </Button>
          {/* dialog box for loging in */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> Login </DialogTitle>
            {/* text fields in dialog box */}
            <DialogContent>
              <TextField id="username" label="Username" type="username" 
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)} fullWidth />
          {/* selection for neighborhoods */}
          <FormControl className={classes.formControl}>
            <InputLabel id="hood-select-label">Neighborhood</InputLabel>
            <Select
              labelId="hood-select-label"
              label="Neighborhood"
              id="hood-select"
              value={hood}
              onChange={handleHoodChange}
            >
              <MenuItem value={'BayouStJohn'}>Bayou St. John</MenuItem>
              <MenuItem value={'Bywater'}>Bywater</MenuItem>
              <MenuItem value={'Carrollton'}>Carrollton</MenuItem>
              <MenuItem value={'CBD'}>Central Business District</MenuItem>
              <MenuItem value={'Downtown'}>Downtown</MenuItem>
              <MenuItem value={'Fountainbleu'}>Fountainbleu</MenuItem>
              <MenuItem value={'FQ'}>French Quarter</MenuItem>
              <MenuItem value={'LGD'}>Lower Garden District</MenuItem>
              <MenuItem value={'Lakeview'}>Lakeview</MenuItem>
              <MenuItem value={'Marigny'}>Marigny</MenuItem>
              <MenuItem value={'MidCity'}>Mid City</MenuItem>
              <MenuItem value={'Riverbend'}>Riverbend</MenuItem>
              <MenuItem value={'Treme'}>Treme</MenuItem>
              <MenuItem value={'Uptown'}>Uptown</MenuItem>
              <MenuItem value={'WestBank'}>West Bank</MenuItem>
            </Select>
            </FormControl>
              <TextField id="password" label="Password" type="password" fullWidth />
            </DialogContent>
            {/* buttons in dialog box */}
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={() => { handleClose(); updateLogin(); userLogin(usernameValue); getUserPosts(usernameValue) }} color="primary">Login</Button>
              <Button onClick={() => { handleClose(); updateLogin(); userSignUp(usernameValue, hood); }} color="primary">Sign Up</Button>
            </DialogActions>
          </Dialog>
    </div>
  );
}

export default Login;