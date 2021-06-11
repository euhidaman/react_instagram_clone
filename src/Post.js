import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post() {
    return (
        <div className="post">
            
            <div className="post__header">
                <Avatar 
                    alt="euhidaman"
                    src="/static/images/avatar/1.jpg" 
                    className="post__avatar"
                />
                <h3>euhidaman</h3>
            </div>

            <img className="post__image"
            src="http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png" 
            alt="reactjs" 
            />
            <h4 className="post__text"><strong>euhidaman</strong>: Learning React!!</h4>
        </div>
    )
}

export default Post
