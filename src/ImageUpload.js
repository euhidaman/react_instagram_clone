import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    
    return (
        <div>
            <Input type="text" onChange={e => setCaption(e.target.value)}/>
            <Input type="file" placeholder="Caption..." onChange={handleChange}/>
            <Button onClick={handleUpload}> Upload </Button>
        </div>
    )
}

export default ImageUpload
