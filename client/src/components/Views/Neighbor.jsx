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

const Neighbor = ({ neighbor, neighborPosts, changeView, changeCurrentPost }) => {
  console.log(neighbor);
  console.log(neighborPosts);
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">{neighbor}</Typography>
      {neighborPosts.map((post, index) =>
        <p>
          <Paper className={classes.paper} elevation={3} key={post.id}>
            <Grid container spacing={3}>
              <Grid item>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Typography gutterBottom id={index} variant="h5" style={{ cursor: 'pointer' }}
                    onClick={() => { changeView("post"), changeCurrentPost(neighboPosts[index]), getComments(post.id) }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.body}</Typography>
                </Grid>
                <Typography variant="subtitle2" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </p>
      )}
    </div>
  )
}

export default Neighbor;