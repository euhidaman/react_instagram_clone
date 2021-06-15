/* eslint-disable no-sequences */
import { useEffect, useState } from 'react';
import './App.css';
import { db, auth } from './firebase';
import Post from "./Post";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('posts').onSnapshot(
      snapshot => {
        setPosts(snapshot.docs.map( doc => ({
          id: doc.id,
          post: doc.data()}) ))
      }
    )
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // Code when user is logged in
        console.log(authUser);
        setUser(authUser); // this is persistent, so even if u refresh, you are always logged in

          // if (authUser.displayName) {
          //   // if old user exists, don't update username in firebase backend
          // } else {
          //   // if new user joined, update username for firebase backend
          //   return authUser.updateProfile({
          //     displayName: username, //
          //   });
          // }

      }
      else{
        // code when user is logged out
        setUser(null);
      }
    })
    
    return () => {
      /* Here 'unsubscribe' is the code for firebase backend
         Basically it prevents the page from creating any unnecessary actions in the backend, 
         when some changes happens. For example -->if we are re-Logging in as a preveiously signed-up user
         then, it will detach the firebase backend listener, that is being represented by 'unsubscribe'.
         This is done to prevent duplicate users.
      */
      unsubscribe();
    }

  }, [user, username]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const signUp = (event) => {
      event.preventDefault();

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
          return authUser.user.updateProfile({
            displayName : username
          })
      })
      .catch((error) => alert(error.message));
  };

  return (

    <div className="app">

      <Modal open={open} onClose={handleClose} >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />             
              <Button disabled={!username, !email, !password} type="submit" variant="contained" color="primary" onClick={signUp}>Sign Up</Button>
            </center>
          </form>         
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
