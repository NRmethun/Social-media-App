import React, { useState, useEffect } from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"
import firebase from 'firebase'
import { db, storage } from "../Databse/firebase"
function Post({ postId, user , username, caption, imageUrl }) {
    const [comments, setComments] = useState([])
    const [comm, setComm] = useState('')

    useEffect(() => {
        console.log(postId)
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp" ,"desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            // cleanup
            unsubscribe();
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault() ;
        
        db.collection("posts").doc(postId).collection("comments").add({

            text:comm ,
            username:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        }) ;

        setComm('') ;
      

    }

    return (
        <div className="post" >

            {/* header -> avatar + username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    src=""
                    alt="NaimMethun"
                />

                <h3 className="post__avatarUserName">{username}</h3>

            </div>



            {/* image */}
            <img
                className="post__image"
                src={imageUrl}
                alt="no post image"
            />

            {/* username + caption */}
            <h4 className="post__text"> <strong> Username: </strong>
                {caption} </h4>


            <div className="post__comments">
        
            {comments.map((comment)=>(
                <p> 
                    {/* {console.log(comment.username)} */}
                    <strong>{comment.username  }</strong> {' '}
                    {comment.text} 
                </p>
            ))}
                

            </div>  


            <form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="add a comment"
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}

                />
                <button
                    disabled={!comm}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>


        </div>
    )
}

export default Post
