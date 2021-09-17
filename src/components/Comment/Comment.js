import React from "react";
import './Comment.css';
import avatar1 from './avatars/avatar1.png';
import avatar3 from './avatars/avatar3.jfif';
import avatar2 from './avatars/avatar2.jfif';

function Comment(props) {

    const handleDate = () => props.dateConverter(Date.now()/1000 - props.created);
    

    return (
        <>
        <div className="comment-container">
            <div className="comment-header">
                <div className="author-container">
                    <img src={props.id % 2 === 0 ? avatar1 : avatar2} width="30" className="rounded-circle" alt="avatar-profile" />
                    <h4 className="text-success">{props.author}</h4>
                </div>
                
                <p className="time text-secondary">{handleDate()}</p>
            </div>
            <div className="comment-body">
                <p>{props.body}</p>
            </div>
        </div>
        
        </>
        
        
    )
}

export default Comment;