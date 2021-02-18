import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ nickname: '', real_name: '', origin_description: '', superpowers: '',catch_phrase: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.nickname}"` : 'Creating a Superhero'}</Typography>
        <TextField name="nickname" variant="outlined" label="Nickname" fullWidth value={postData.nickname} onChange={(e) => setPostData({ ...postData, nickname: e.target.value })} />
        <TextField name="real_name" variant="outlined" label="Real Name" fullWidth value={postData.real_name} onChange={(e) => setPostData({ ...postData, real_name: e.target.value })} />
        <TextField name="origin_description" variant="outlined" label="Origin description" fullWidth multiline rows={4} value={postData.origin_description} onChange={(e) => setPostData({ ...postData, origin_description: e.target.value })} />
        <TextField name="superpowers" variant="outlined" label="Superpowers (, separated)" fullWidth value={postData.superpowers} onChange={(e) => setPostData({ ...postData, superpowers: e.target.value.split(',') })} />
        <TextField name="catch_phrase" variant="outlined" label="Catch phrase" fullWidth value={postData.catch_phrase} onChange={(e) => setPostData({ ...postData, catch_phrase: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonAdd} variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
