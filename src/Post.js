import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';

function Post({postId, username, caption, imgUrl}) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe;

        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    return (
        <div className="post">
            
            <div className="post__header">
                <Avatar 
                    alt={username}
                    src="/static/images/avatar/1.jpg" 
                    className="post__avatar"
                />
                <h3>{username}</h3>
            </div>

            <img className="post__image"
            src={imgUrl} 
            alt="reactjs" 
            />
            <h4 className="post__text"><strong>{username}</strong>: {caption} </h4>
        </div>
    )
}

export default Post
