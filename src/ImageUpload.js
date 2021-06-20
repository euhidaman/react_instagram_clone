import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import firebase from "firebase";
import './ImageUpload.css';
import { storage, db } from './firebase';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        // store the image URL, and append `images` at the start to make the URL valid
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        // The below piece of code is to show the progressing blue line while uploading any file
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Happens when unable to upload due to some reason
                console.log(error);
                alert(error.message)
            },
            () => {
                // gets the download link, which has URL `images` at the start from the firebase storage
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imgUrl: url,
                        username: username
                    });
                    setImage(null);
                    setProgress(0);
                    setCaption("");
                })
            }
        )
    }
    
    return (
        <div className="imageupload">
            <center>
                <progress value={progress} className="imageupload__progress" max="100" /><br />&emsp;&emsp;
                <Input type="file" className="tab2" onChange={handleChange} /><br />
                <Input type="text" placeholder="Caption..." onChange={e => setCaption(e.target.value)} /><br />
                <Button onClick={handleUpload} variant="contained" color="primary"> Upload </Button>
            </center>
        </div>
    )
}

export default ImageUpload
