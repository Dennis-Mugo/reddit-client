import { faAngleDown, faAngleUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Reddit from '../../utils/Reddit';

import './Posts.css';
import Comment from '../Comment/Comment';
import Skeleton from '@yisheng90/react-loading';

function convertPostScore(num) {
    let units = ['K', 'M', 'B'];
    let converted = num;
    let count = 0;
    while (num >= 1000) {
        num = Math.floor(num / 1000);
        converted = Math.floor(num).toString() + units[count].toString();
        count += 1;
    }
    return converted;
}

function getPostImage(image) {
    if (image.includes('jpg') || image.includes('png') || image.includes('jpeg')) {
        return (
            <div className='image-container'>
                <img className="post-image" width="60%" src={image} alt="" />
            </div>
            
        )
    }
    return;
}

function getPostVideo(video) {
    if (video.includes('mp4')) {
        return (
            <div className='video-container'>
                <video src={video} width="60%" controls >
                    {/* <source src={video} type="video/mp4" /> */}
                </video>
            </div>
        )
    }
    return;
}

function pluralize(num, noun) {
    if (num === '1') {
        if (noun === 'hour') {
            return 'an hour ago';
        }
        return `a ${noun} ago`;
    }
    return `${num} ${noun}s ago`;
}

function getDateCreated(sec) {
    
    if (sec < 60) {
        return pluralize(Math.floor(sec).toString(), 'second');
    } else if (sec < 3600) {
        return pluralize(Math.floor(sec / 60).toString(), 'minute');
    } else if (sec < 86400) {
        return pluralize(Math.floor(sec / 3600).toString(), 'hour');
    } else if (sec < 604800) {
        return pluralize(Math.floor(sec / 86400).toString(), 'day');
    } else if (sec < 2419200) {
        return pluralize(Math.floor(sec / 604800).toString(), 'week');
    } else if (sec < 31536000) {
        return pluralize(Math.floor(sec / 2419200).toString(), 'month');
    } else {
        return pluralize(Math.floor(sec / 31536000).toString(), 'year');
    }

}



function Post(props) {
    
    let postScore = convertPostScore(props.score);

    let postImage = (props.image) ? getPostImage(props.image) : '';
    let video = (props.media) ? getPostVideo(props.media) : '';
    let dateCreated = getDateCreated(Date.now()/1000 - props.created);
    

    

    let [comments, setComments] = useState('');
    let [numComments, setNumComments] = useState(0);
    let [commentToggleCount, setCommentToggleCount] = useState(0);

    const displayComments = () => {
        if (commentToggleCount % 2 === 0) {
            return;
        }
        else {
            
            if (numComments) {
                return (
                    comments[1].data.children.map((commentItem, i) => {
                        if (i !== numComments - 1) {
                            return (
                                <Comment 
                                    key={i.toString()}
                                    author={commentItem.data.author}
                                    created={commentItem.data.created}
                                    body={commentItem.data.body}
                                    dateConverter={getDateCreated}
                                    id={i}
    
                                />
                            )
                        }
                    })
                )
            }
            return (
                <div>
                    {
                        new Array(5).fill('').map((item, i) => (<Skeleton key={i} />))
                    }
                    
                </div>
            );
        } 
        }


    useEffect(() => {
        
        Reddit.getSubRedditComments(props.permalink).then(response => {
            setComments(response);
            setNumComments(response[1].data.children.length);
        })

        return (() => {
            setComments('');
            setNumComments(0);
            setCommentToggleCount(0);
        })
        
    }, [props.permalink]);

    useEffect(() => {
        displayComments();

    }, [commentToggleCount])

    //console.log(comments);
    //console.log(numComments);


    

    return (
        <div className="row post-container">
            <div className="col-sm-1 col-md-1">

                <div className="post-score">
                    <div className="arrows arrow-up">
                        <FontAwesomeIcon icon={faAngleUp} />
                    </div>
                    
                    <h3 className="text-secondary">{postScore}</h3>
                    <div className="arrows arrow-down">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
            </div>
            <div className="col-sm-11 col-md-11" id={props.id}>
                <h2 className="text-dark">{props.title}</h2>
                <br />
                {postImage ? postImage : video}
                <hr />
                <div className="post-baseline">
                    <div className="post-author">
                        <img src={props.thumbnail} width="40" height="40" className="rounded-circle" />
                        <h4>{props.author}</h4>
                    </div>
                    
                    <p className="text-secondary">{dateCreated}</p>
                    <p className="comment-count" onClick={
                        e => {
                                setCommentToggleCount(commentToggleCount + 1);
                                e.currentTarget.classList.toggle('text-success');
                            }
                        }>
                        <FontAwesomeIcon icon={faCommentDots} />&nbsp;{convertPostScore(props.commentCount)}
                    </p>
                </div>
                {displayComments()}
            </div>
        </div>
    )
    
}

export default Post;