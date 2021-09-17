import React, { useEffect, useState } from 'react';
import './Pics.css';

import Reddit from '../../utils/Reddit';
import Post from '../Posts/Posts';
import NetworkError from '../NetworkError/NetworkError';
import Skeleton from '@yisheng90/react-loading';
import defaultUser from './default-user-icon.jpg';



function Pics(props) {
    let [data, setData] = useState('');
    let [dataLength, setDataLength] = useState(0);

    const fetchData = () => {
        setData('');
        Reddit.getSubRedditData(props.category).then(result => {
            setData(result);
            setDataLength(result.data.dist);
        }).catch(error => {
            setData('error')
            setDataLength(0);
        });
    }
    
    useEffect(() => {     
        
            fetchData();
            

            return () => {
                setData('');
                setDataLength(0);
            }
                    
        
    }, [props.category])
    
    
    
    console.log(data);
    console.log(dataLength);
    

    //const childrenLength = data.data.dist;

    const getThumbnail = (img) => {
        if (img.includes('jpg') || img.includes('png') || img.includes('jpeg')) {
            return img;
        }
        return defaultUser;   
    }

    const getVideo = (video) => {
        console.log(video);
        if (!video) {
            return null;
        } else if (video.reddit_video) {
            return video.reddit_video.fallback_url;
        } else {
            return null;
        }
        //return video.reddit_video ? video : null;
    }


    const showPosts = () => {
        if (data === 'error') {
            return (<NetworkError fetchData={fetchData} />);
        }

        if (dataLength === 0) {
            
            return new Array(10).fill('').map((element, i) => (
                <div key={i} className="row g-0 loading-post-container">
                    <div className="col-sm-1 col-md-1">
                        <Skeleton row={1} height={70} width={40} />

                    </div>
                    <div className="col-sm-11 col-md-11"> 
                        <Skeleton row={1} width="70%" height={40}/>
                        <br />
                        {/* <Skeleton row={1} height="50px" />      */}
                        <Skeleton row={1} height={250} />
                        <hr/>
                        <div className="loading-post-bottom">
                            <div className="author-container">
                                <Skeleton width={40} circle />&nbsp;&nbsp;
                                <Skeleton row={1}  width={100} height={30} />
                            </div>
                            <Skeleton width={70} height={30} />
                            <Skeleton width={70} height={30} />
                            
                        </div>
                        
                    </div>
                    
                </div>
            
            
            ));
        }
        
        let posts = [];
        for (let i = 0; i < dataLength; i++) {
            if (data.data.children[i].data.title.toLowerCase().includes(props.searchKeyWord.toLowerCase())) {
                let thumbnail = getThumbnail(
                    data.data.children[i].data.thumbnail,
                    );

                let media = getVideo(data.data.children[i].data.secure_media);
                posts.push(
                    <Post 
                        key={i.toString()}
                        title={data.data.children[i].data.title}
                        author={data.data.children[i].data.author} 
                        score={data.data.children[i].data.score} 
                        image={data.data.children[i].data.url_overridden_by_dest}
                        created={data.data.children[i].data.created}
                        commentCount={data.data.children[i].data.num_comments}
                        permalink={data.data.children[i].data.permalink}
                        thumbnail={thumbnail}
                        media={media}
                        id={i.toString()}
                    />
                        );
            }
            
            
        }
        return posts;
}

    
    return (
        
        <div className="main">
            {
                showPosts()
            }
        </div>
        
        
        
        
    )

}

export default Pics;