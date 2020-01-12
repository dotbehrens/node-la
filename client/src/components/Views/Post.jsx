import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Comment from '../Comment.jsx';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 700,
  },
  comment: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
  },
  button: {
    background: 'linear-gradient(45deg, #00796b 30%, #43a047 90%)',
    borderRadius: 4,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  alignItemsAndJustifyContent: {
    width: 'auto',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Post = ({ changeView, currentPost, createComment, toggleFavorite }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Button to go back to all posts */}
      <div className={classes.alignItemsAndJustifyContent}>
        <Button className={classes.button} style={{ fontWeight: "bolder" }} onClick={() => { changeView("posts") }}> Back To Posts </Button>
      </div>
      {/* Main post container */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ fontWeight: "bolder", textAlign: "center" }}>{currentPost.title}</Typography>
            <Typography variant="h6" color="primary" style={{ fontWeight: "bolder", textAlign: "right" }}>{currentPost.username}</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{ textAlign: "right" }}>{moment(currentPost.createdAt).fromNow()}</Typography>
            <Typography variant="h6">{currentPost.postBody}</Typography>
            <FavoriteBorderIcon
                    size="medium"
                    onClick={() => {
                      toggleFavorite(post.id, neighbor);
                    }}/>
          </Paper>
        </Grid>
        {/* Button with dialog box for adding comments*/}
        <Comment currentPost={currentPost} createComment={createComment} />
        {/* Comment layout goes here */}
        <Grid item xs={12}>
          <Paper className={classes.comment}>
            <Typography variant="h6" color="primary" style={{ fontWeight: "bolder" }}>Username</Typography>
            <Typography variant="body2">Comment 1 placeholder text</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Post;