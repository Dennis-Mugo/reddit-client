

import './App.css';
import React, { useState, useEffect } from 'react';
import TopNav from '../TopNav/TopNav';
import Pics from '../Pics/Pics';
import SideNav from '../SideNav/SideNav';




function App() {
  const [image, setImage] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [subReddit, setSubReddit] = useState('pics');

  // useEffect(() => {
  //   return;
  // }, [subReddit]);
  

  useEffect(() => {
    if (!image) {
      getImage();
    }
  }, [image]);

  const getImage = async () => {
    //let response = await fetch('https://www.reddit.com/r/pics.json');
    let response = await fetch('https://www.reddit.com/r/pics/comments/pn0lg5/the_one_girl_not_wearing_a_niqab_during_the/.json');
    let data = await response.json();
    let actualImage = data;
    setImage(actualImage);
  };

  //console.log(image);
  
  // image = fetch('https://www.reddit.com/r/popular.json').then(response => {
  //   return response.json();
  // }).then(jsonResponse => {
  //   return jsonResponse.data.children[2].data.title;
    
  // });

  
  

  const handleSearch = (keyWord) => {
    setSearchWord(keyWord);
  }

  const changeSubReddit = (newSubReddit) => {
    setSubReddit(newSubReddit);
  }
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
      <TopNav handleSearch={handleSearch}/>
      
      </header>
      <div className="main-content row g-0">
        <div className="col-sm-9 col-md-9">
          <Pics searchKeyWord={searchWord} category={subReddit} />
        </div>
        <div className="col-sm-3 col-md-3 main-right">
            <SideNav category={subReddit} changeSubReddit={changeSubReddit} />
        </div>
      
      </div>
      

      
    </div>
  );
  
}

export default App;
