import React, { useState } from "react";
import { storage, firestore } from "../firebase";
import firebase from "firebase";
import "./postupload.css";


const PostUpload = ({ username }) => {


    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);


    const fileUpload = (event) => {
    
        console.log('file is being uploaded');
        setImage(event.target.files[0]);

    };

    
    const handleFileUpload = () => {
        console.log("instagram post is being uploaded along with the file");
        console.log(caption);
        const uploadTask = storage.ref(`images/${ image.name }`).put(image);
        uploadTask.on(
            "state_chagned",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                console.log(progress);
                setProgress(progress);
            },

            (error) => {
                alert(error.message);
            },

            () => {
                //on completion of instagram post 
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {

                    firestore.collection("posts").add({

                        timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imgUrl: url,
                        username: username
                    })

                })
                setProgress(0);
                setImage("");
                setCaption("");
            }

            


        
        );
        console.log("this is working pretty good");
    }


    
    return (

        <div className="upload__post">
            
            <input 
                type="text" 
                placeholder="Enter your caption..." 
                className="upload__caption" 
                value={ caption } 
                onChange={ (e) => setCaption(e.target.value)} 
            />

            <input 
                type="file" 
                onChange={ fileUpload } 
            
                className="upload__file"
            />
            <progress value={ progress } max="100" className="upload__progressBar"/>
            <input type="button" value="Upload" className="upload__btn" onClick={ handleFileUpload } />
            
        </div>
    );
};

export default PostUpload;