import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Home } from 'lucide-react';
import { Globe } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { Briefcase } from 'lucide-react';

function LeftPart() {
  const [activeItem, setActiveItem] = useState('Questions');

  const handleItemClick = (item) => {
    setActiveItem(item);
    if(item==='Questions'){
      window.location.reload();
    }
  };

  return (

    <div style={{ width: '240px', height: '900px', position: 'absolute', top: '90px', left: '10px', paddingBottom: '10px', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleItemClick('Home')}>
        <span role="img" aria-label="home" style={{ fontSize: '24px', marginRight: '5px', color: activeItem === 'Home' ? 'orange' : 'black' }}> <Home /></span> Home
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleItemClick('Public')}>
        <span role="img" aria-label="world" style={{ fontSize: '24px', marginRight: '5px', color:  'black' }}> <Globe /></span> Public
        <span role="img" aria-label="upcap" style={{ fontSize: '24px', marginLeft: '55px' }}><ChevronUp/></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      
        <div style={{ marginBottom: '5px', cursor: 'pointer', color: activeItem === 'Questions' ? 'orange' : 'black', marginLeft: '35px' }} onClick={() => handleItemClick('Questions')}>Questions<span style={{marginLeft:"45px",fontWeight:"bolder",height:"2333px",color:"red"}}>|</span>
         </div>
        
        <div style={{ marginBottom: '5px', cursor: 'pointer', color: activeItem === 'Tags' ? 'orange' : 'black', marginLeft: '35px' }} onClick={() => handleItemClick('Tags')}>Tags</div>
        <div style={{ marginBottom: '5px', cursor: 'pointer', color: activeItem === 'Users' ? 'orange' : 'black', marginLeft: '35px' }} onClick={() => handleItemClick('Users')}>Users</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleItemClick('Collectives')}>
        <span role="img" aria-label="collectives" style={{ fontSize: '24px', marginRight: '5px', color: activeItem === 'Collectives' ? 'orange' : 'black' }}><FontAwesomeIcon icon={faUsers}/></span> Collectives
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleItemClick('Jobs')}>
        <span role="img" aria-label="jobs" style={{ fontSize: '24px', marginRight: '5px', color: activeItem === 'Jobs' ? 'orange' : 'black' }}><Briefcase/></span> Jobs
      </div>
      

      <div style={{ position: 'fixed', left: '10px', bottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <div style={{ backgroundColor: 'white', width: '134px', borderRadius: '3px', padding: '10px', marginBottom: '10px', textAlign: 'center', border: '2px solid orange', color: 'orange' }}>
    Log In
  </div>
  <div style={{ backgroundColor: 'orange', width: '134px', padding: '10px', textAlign: 'center', border: '2px solid orange', color: 'white' }}>
    Sign Up
  </div>
</div>
</div>


  );
}

export default LeftPart;
