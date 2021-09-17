import React from 'react';
import logo from './redditlogo.svg';
import './TopNav.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearchDollar, faSearchLocation, faSearchPlus } from '@fortawesome/free-solid-svg-icons'

function TopNav(props) {

    const updateSearchWord = (e) => {
        props.handleSearch(e.target.value);
    }

    const placeHolder = <FontAwesomeIcon icon={faSearchPlus} />

    return (
        <nav className="top-nav row g-0">
            <div className="col-sm-4 col-md-4 title">
                <img src={logo} alt="logo" width="40" />
                <h1>reddit<span className="nav-title-minimal">Minimal</span></h1>
            </div>
            <div className="col-sm-4 col-md-4 search-container">
                
                    <div className="inner-search-container">
                    <label className="search-icon"><FontAwesomeIcon icon={faSearchPlus} /></label>
                        <input className="search-input" placeholder="Search" onChange={updateSearchWord} />
                        
                    </div>
                    
                
                    
            </div>
            <div className="col-sm-4 col-md-4"></div>
            {/* <div className="nav-left">
                <div></div>
                
                
            </div> */}
            
        </nav>
    );
}

export default TopNav;