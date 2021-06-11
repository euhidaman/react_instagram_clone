import { useState } from 'react';
import './App.css';
import Post from "./Post";

function App() {

  const [posts, setPosts] = useState([
    {
      username:"euhidaman",
      caption:"Learning React!!!⚛⚛", 
      imgUrl:"https://media.wired.com/photos/5cc244c9af643e2f373ebb28/master/pass/Coding-Becomes-Criminal.jpg"
    },
    {
      username:"euhidaman",
      caption:"The Flash⚡⚡",
      imgUrl:"https://i.pinimg.com/originals/e4/f1/1e/e4f11ea842bdb327438275b0d12d95bb.jpg"
    }
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {
        posts.map(post => (
          <Post username={post.username}
            caption={post.caption}
            imgUrl={post.imgUrl}
          />
        ))
      }

    </div>
  );
}

export default App;
