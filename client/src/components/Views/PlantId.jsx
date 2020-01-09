import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
  },
}));

const PlantId = ({ changeView, userPosts, changeCurrentPost, handleUrl, uploadFile }) => {

  const classes = useStyles();
  return (
    <div> 
      <br />
      <Typography variant="h4" style={{ fontWeight: "bolder", textAlign: "center", color: "white" }}>
       Upload Image to Identify Plant
      </Typography>
        <Grid item xs={12}>
          <Paper >
          <input type="file" name="url" onChange={handleUrl} />          
          <button onClick={() => {uploadFile()}}>Upload</button>
          <div className={classes.alignItemsAndJustifyContent}>
            </div>
          </Paper>
        </Grid>  
    </div>
  );
}

export default PlantId;