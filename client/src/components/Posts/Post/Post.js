import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import {deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || ''} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.nickname}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>Edit</Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.superpowers.map((superpower) => `#${superpower} `)}</Typography>
      </div>
      <Typography className={classes.real_name} variant="body2" gutterBottom  component="p">{post.real_name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.origin_description}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.catch_phrase}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
