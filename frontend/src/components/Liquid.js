import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import './styles/stylesheet.css'
function Liquid() {
    const navigate = useNavigate()
    const state = useLocation()
    
    async function liquidate(){
        // Interact with contract
        // navigate home dont need to send the new borrowed amount as it is auto changed in contract above
        // liquidate?uid=lBFxf6GG11YZJsga3qWAyMKFZuk1&amount=1
        const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
        const borrowed = state.state.borrowed
        const uid = state.state.uid
        const url = "https://trustpay-f2ee3.web.app/liquidate?uid="+uid+"&amount="+borrowed
        await axios.get(url, {headers})
        .then((response) => { 
            console.log('res', response);
        })
        .catch((error) => {
            console.log(error)
        });
        navigate('/home', {state: {email: state.state.email, uid: state.state.uid}})
    }

    function gobackHome(){
        navigate('/home', {state: {email: state.state.email, uid: state.state.uid}})
    }

    
  return (
    <>

    <div class="profile borrow-hld warning-hld popup-holder move-down">
    <div className="formbox">
   <center>
   <h3 className="popup-title">  Liquidate Ethereum </h3>
   
   <p className="warning"> Warning! liquidation cannot be undone </p>
   
   

    <button onClick={liquidate} className="main-button extend fl-btn"> Liquidate</button> 
   
   </center>
   </div>
    
    </div>

   
        {/* <button onClick = {gobackHome}>Home</button>
        <button onClick = {liquidate}>Liquidate</button> */}

    </>
  )
}

export default Liquid