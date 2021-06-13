import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import Post from "./Post";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';


function getModalStyle() {
  const top = 100;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection('posts').onSnapshot(
      snapshot => {
        setPosts(snapshot.docs.map( doc => ({
          id: doc.id,
          post: doc.data()}) ))
      }
    )
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (

    <div className="app">

      <Modal open={open} onClose={handleClose} >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <Button onClick={handleOpen}>Sign Up</Button>

      {
        posts.map(({id, post}) => (
          <Post key = {id}
            username={post.username}
            caption={post.caption}
            imgUrl={post.imgUrl}
          />
        ))
      }

    </div>
  );
}

export default App;
