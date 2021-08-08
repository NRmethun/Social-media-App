import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import firebase from 'firebase';
import { storage,db } from '../Databse/firebase'; 
import InstagramEmbed from 'react-instagram-embed';

import "./ImageUpload.css" ;
function ImageUpload({username}) {
    const [caption,setCaption] = useState('') ; 
    const [progress,setProgress] = useState(0) ; 

    const [image,setImage] = useState(null) ; 

    const [url,setUrl] = useState('') ; 

    const handleChange=(e) =>
    {
        if(e.target.files[0] ) 
        {
            setImage(e.target.files[0]) ;
        }

    }
    const handleUpload =(e)=> {

        const uploadTask =storage.ref( `images/${image.name}`).put(image) ;

        uploadTask.on(
            "state_changed" ,
            (snapshot) => {
                const progress =Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) *100
                ) ;

                setProgress(progress) ;
            } ,
            (error) => {
                //error function m
                console.log(error) ;
                alert(error.message) ;
            } ,
            () => {
                //complete function 
                storage
                   .ref("images") 
                   .child(image.name) 
                   .getDownloadURL()
                   .then(url => {
                       // post image in database 

                       db.collection("posts").add({
                           timestamp: firebase.firestore.FieldValue.serverTimestamp() ,  
                           caption:caption ,
                           imageUrl:url ,
                           username:username ,
                        }) ;
                        setProgress(0) ;
                        setCaption("") ;
                        setImage(null) ;
                   })

            }
        )

    }


    return (
        <div className="imageupload">  
            {/* caption Input */} 
            {/* File picker */} 
            {/* post button */} 
            <progress className="imageupload__progress" 
             value={progress} max="100" />
            <input type="text" placeholder="Enter a caption... "
             value={caption} 
             onChange={(e) => setCaption(e.target.value) }
             />
            <input type="file" onChange={handleChange} /> 
            <Button onClick={handleUpload} > 
              Upload
            </Button>  
{/* its not working */}
            

        </div>
    )
}

export default ImageUpload
