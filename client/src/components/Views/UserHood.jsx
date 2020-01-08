import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent, Typography, Button } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(3),
    borderRadius: 3,
    borderShadow: 3,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const UserHood = ({ changeView, userPosts, neighbors, getNeighbor }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>Meet your neighbors:</Typography>
      {neighbors.map((neighbor) => {  
        return (
        <Container className={classes.root}>
          {console.log(neighbor.username)}
          <Card className={classes.card} key={neighbor.id}>
              <CardContent>
                <Button 
                  size="large" 
                  fullWidth="true" 
                  variant="text" 
                  style={{ color: '#00796b', fontWeight: "bold", cursor: 'pointer' }}
                  onClick={() => getNeighbor(neighbor.username)}
                >{neighbor.username}</Button>
                <Typography align="center">here's my bio!</Typography>
              </CardContent>
            </Card>
          </Container>
        )
      })}
    </div>
  )
}

export default UserHood;