import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, FormLabel, Button, Paper, TextField, FormControl, Select, MenuItem, Typography } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  button: {
    background: 'linear-gradient(45deg, #00796b 30%, #43a047 90%)',
    borderRadius: 4,
    color: 'white',
    padding: theme.spacing(1),
    margin: '10px',
  },
  paper: {
    margin: theme.spacing(3),
    minWidth: 120,
    padding: theme.spacing(1),
    maxWidth: 700,
  }
}));


const UserProfile = ({ updateUserBio, updateUserHood, neighborhood, handleProfileImage, profileImage }) => {
  const classes = useStyles();
  const [bio, setUserBio] = useState('');
  const [hood, setHood] = useState('');
  const [open, setOpen] = useState(false);

  const handleBioClick = () => {
    setOpen(true);
    updateUserBio(bio);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //handle state change of neighborhood type
  const handleHoodChange = event => {
    setHood(event.target.value);
  };

  const handleHoodClick = () => {
    updateUserHood(hood);
  }

  return (
    <div>
      <Paper aria-labelledby="form-title" className={classes.paper}>
      <img src={profileImage}/>
      </Paper>
      <Paper aria-labelledby="form-title" className={classes.paper}>
      <FormLabel className="formLabel" id="form-dialog-title"> Update Your Profile Picture </FormLabel>
          <input type="file" name="url" onChange={handleProfileImage} />          
          <Button className={classes.button} color="primary" onClick={()=> handleProfileImage}>Upload</Button>
          </Paper>
      <Paper aria-labelledby="form-title" className={classes.paper}>
        <FormLabel className="formLabel" id="form-dialog-title"> Edit your bio </FormLabel>
          <TextField id="bio" label="Bio" type="bio" value={bio} onChange={(e) => setUserBio(e.target.value)} fullWidth />
        <Button className={classes.button} color="primary" onClick={handleBioClick}>Save</Button>
        {/* <input type="file" name="url" onChange={this.handleUrl} />          
        <button onClick={() => {uploadFile()}}>Upload</button> */}
      </Paper>
      <Paper aria-labelledby="form-title" className={classes.paper}>
        <Typography>You're currently in {neighborhood}</Typography>
        <FormLabel className="formLabel" id="form-dialog-title">Change your neighborhood </FormLabel>
        <FormControl className={classes.formControl}>
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
            <MenuItem value={'Fountainbleu'}>Fountainbleu</MenuItem>
            <MenuItem value={'FQ'}>French Quarter</MenuItem>
            <MenuItem value={'IrishChannel'}>Irish Channel</MenuItem>
            <MenuItem value={'LGD'}>Lower Garden District</MenuItem>
            <MenuItem value={'Lakeview'}>Lakeview</MenuItem>
            <MenuItem value={'Marigny'}>Marigny</MenuItem>
            <MenuItem value={'MidCity'}>Mid City</MenuItem>
            <MenuItem value={'Riverbend'}>Riverbend</MenuItem>
            <MenuItem value={'Treme'}>Treme</MenuItem>
            <MenuItem value={'WestBank'}>West Bank</MenuItem>
          </Select>
        </FormControl>
        <Button className={classes.button} color="primary" onClick={handleHoodClick}>Save</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} color="success">
            Profile saved!
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  )
}

export default UserProfile;