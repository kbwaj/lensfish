import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import './styles/stylesheet.css'
function Instructions() {
    const state = useLocation()
    const navigate = useNavigate()
    function goHome(){
        navigate('/home', {state: {}})
    }
    function handleDone(){
        alert('Your stuff will be transferred soon')
        navigate('/home', {state: {email: state.state.email, uid: state.state.uid}})
    }
  return (
    <>
        <div className="header">
          <div className="left_header">
              <a href="home_page.html" className="header_text"> LensLend </a></div>
              <div className="right_header">
              <a href="about_page.html" className="header_text">  About  </a></div>
        </div>
        <hr/>
        <div className="mainbody">

           Check out this link: <a href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/"> Install Metamask</a> to install Metamask on Google Chrome.

           To open Metamask after logging in, click on the fox icon in the top right corner (of Google Chrome), or click the puzzle icon in the top right to make the fox (Metamask) icon visible. 

           Then click the fox to open your wallet. This may take a few seconds. 
            
        </div>
        
        {/* <div>Instructions</div>
        <button onClick={goHome}>Home</button>
        <button onClick={handleDone}>Done</button> */}
    </>
  )
}

export default Instructions