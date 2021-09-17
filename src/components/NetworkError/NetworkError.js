import React from 'react';
import './NetworkError.css';
import icon from './icon1.png';

function NetworkError(props) {
    const handleClick = () => {
        props.fetchData();
    }

    return (
        <div className="network-error-container">
            <div className="content-container">
                <div className="network-icon">
                    <img src={icon} alt="network error icon" />
                </div>
                
                <h2>Please check your internet connection</h2>
                <div className="retry-button">
                    <button className="btn btn-secondary" onClick={handleClick}>Retry</button>
                </div>
                
            </div>
        </div>
    )
}

export default NetworkError;