import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 700,
  },
  alignItemsAndJustifyContent: {
    width: 'auto',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    justifyContent: 'center',
    height: 60,
    display: 'flex',
  },
  button: {
    background: '#43a047',
    borderRadius: 4,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  searchForm: {
    padding: theme.spacing(1),
    background: '#00796b',
    margin: 'auto',
    maxWidth: 400,
  }
}));

const Neighborhoods = ({ changeView, getHoodPosts, hoodPosts }) => {
  //use given style from above
  const classes = useStyles();
  //react hook to set temporary state
  const [hood, setHood] = React.useState('');
  //handle state change of neighborhood type
  const handleHoodChange = event => {
    setHood(event.target.value);
  };

  return (
    <div className={classes.root}>
      {/* View title */}
      <Typography variant="h4" style={{ fontWeight: "bolder", textAlign: "center", color: "white" }}>
        Select Your Neighborhood
      </Typography>
      {/* Neighborhood selector form */}
        <Grid item xs={12}>
          <Paper className={classes.searchForm}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="hood-select-label">Neighborhood</InputLabel>
              <Select
                labelId="hood-select-label"
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
                <MenuItem value={'IrishChannel'}>Irish Channel</MenuItem>
                <MenuItem value={'NorthShore'}>North Shore</MenuItem>
              </Select>
            </FormControl>
          {/* Select button */}
          <div className={classes.alignItemsAndJustifyContent}>
            <Button className={classes.button} style={{ fontWeight: "bolder" }} onClick={() => { getHoodPosts(hood) }}>SELECT</Button>
            </div>
          </Paper>
        </Grid>
      <br />
      {/* If no posts found, tell the user, otherwise show the posts */}
      {!hoodPosts.length > 0 ? <Typography variant="h5" style={{ fontWeight: "bolder", textAlign: "center", color: "white" }}>No Posts Found</Typography>
        : hoodPosts.map((post, index) =>
          <p>
            <Paper className={classes.paper} elevation={3}>
              <Grid container spacing={3}>
                <Grid item>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Typography gutterBottom id={index} variant="h5" style={{ cursor: 'pointer' }}
                      onClick={() => { changeView("post"), changeCurrentPost(posts[index]), getComments(post.id) }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2">{post.body}</Typography>
                    <Typography variant="body2" style={{ color: '#00796b', fontWeight: "bolder" }}>Username</Typography>
                  </Grid>
                  <Typography variant="subtitle2" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </p>
        )}
    </div>
  );
}

export default Neighborhoods;