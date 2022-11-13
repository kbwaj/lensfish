import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
function PayBack() {
    const navigate = useNavigate()
    const state = useLocation()
    function handleLiquid() {
        navigate('/liquid', {state:{email: state.state.email, uid: state.state.uid, borrowed: state.state.borrowed}})
    }

    function handlePay(){
        // navigate('/pay', {state:{email: state.state.email, uid: state.state.uid}})
        // go back to home with updated borrowing and if borrowed does not exit (condition) let it equal 0 
        const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
        const uid = state.state.uid
        const url = 'https://trustpay-f2ee3.web.app/payback?uid='+uid
        axios.get(url, {headers})
        .then((response) => { 
            console.log('res', response);
            navigate('/home', {state: {email:state.state.email, uid: state.state.uid}})
        })
        .catch((error) => {
            console.log(error)
        }); 
         
    }
    function gobackHome(){
        navigate('/home', {state: {email:state.state.email, uid: state.state.uid}})
    }
  return (
    <>
        <button onClick ={gobackHome}>Home</button>
        <button onClick = {handleLiquid}>Liquidate</button>
        <button onClick = {handlePay}>Pay</button>
    </>
  )
}

export default PayBack