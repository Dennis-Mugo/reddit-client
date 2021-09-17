import React from 'react';
import './SideNav.css';
import picIcon from './images/pics.png';
import Reddit from '../../utils/Reddit';

import funny from './images/funny.png';
import gaming from './images/gaming.png';
import home from './images/home.png';
import interesting from './images/interesting.jpg';
import memes from './images/memes.jfif';
import unexpected from './images/unexpected.png';
import pics from './images/pics2.png';

const picIcons = {
    'Home': home,
    'Funny': funny,
    'Gaming': gaming,
    'Damn thats interesting': interesting,
    'Memes': memes,
    'Unexpected': unexpected,
    'Pics': pics,
}

function SideNav(props) {
    const handleClick = (e) => {
        let linkSection = document.getElementById(`nav${e.currentTarget.id}`).innerHTML;
        linkSection = Reddit.subReddits[linkSection];
        props.changeSubReddit(linkSection);

        const allLinks = document.getElementsByClassName('nav-item');
        console.log(allLinks);
        for (let i = 0; i < allLinks.length; i++) {
            if (allLinks[i].classList.length > 1) {
                allLinks[i].classList.remove('active');
            }
        }
        
        e.currentTarget.classList.add('active');
    }

    const navItems = ['Home', 'Memes', 'Pics', 'Funny', 'Unexpected', 'Movies', 'Damn thats interesting', 'One Piece', 'Cringetopia', 'Minecraft', 'Gaming', 'League of legends', 'About Tinder', 'Politics', 'Final fantasy X', 'Public Freakout', 'Genshin Impact', 'No Stupid Questions', 'Ask Reddit', 'News', 'Ask Men'];

    return (
        <div className="sideNavList">
        <div className="subRedditsTitle">
            <h3>SubReddits</h3>
        </div>
        
        <ul className="">
            
            {navItems.map((item, i) => (
                <li className={item === 'Pics' ? 'nav-item active' : 'nav-item'} onClick={handleClick} key={i} id={i}>
                    <div>
                        <img src={picIcons[item] ? picIcons[item] : picIcon} className="rounded-circle" width="30" height="30" alt="nav item icon" />
                    </div>
                    <span id={`nav${i}`}>{item}</span>
                </li>
            ))}
        </ul>
        </div>
    )
    
}

export default SideNav;