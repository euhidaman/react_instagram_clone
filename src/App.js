import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import Post from "./Post";
//57:30
function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(
      snapshot => {
        setPosts(snapshot.docs.map( doc => ({
          id: doc.id,
          post: doc.data()}) ))
      }
    )
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

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
