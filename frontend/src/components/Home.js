import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import lion from './lion.png' 
function Home() {
    const [borrowed, setBorrowed] = useState(0)
    const [ethAmount, setEthAmount] = useState(0)
    const [tctAmount, setTctAmount] = useState(0)
    const [toggle, setToggle] = useState('invisible')
    const navigate = useNavigate()
    const state = useLocation();
    const email = state.state.email
    console.log(state)
    function redirectLender(){
        navigate('/lender', { state:{email: state.state.email, uid:state.state.uid}})
    }
    function redirectBorrow(){
        navigate('/borrow', { state:{email:state.state.email, uid:state.state.uid, ethAmount: ethAmount}})
    }
    function redirectPay(){
        // navigate('/payback', { state:{email:state.state.email, uid:state.state.uid, borrowed: borrowed}})
        setToggle('settle-popup')
    }
    const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
    
    async function updateEth(){
        const uid = state.state.uid
        const url = 'https://trustpay-f2ee3.web.app/currentCollateral?uid=' + uid
        await axios.get(url, {headers})
        .then((response) => { 
            console.log('res', response);
            const eth = parseFloat(response.data) / 10**18
            setEthAmount(eth)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    async function updateTCT(){
        const url = 'https://trustpay-f2ee3.web.app/getCurrentLiquidity'
        await axios.get(url, {headers})
        .then((response) => { 
            console.log('tctres', response);
            const tct = parseFloat(response.data)
            setTctAmount(tct)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    async function updateBorrow(){
        // /borrowInfo?uid=lBFxf6GG11YZJsga3qWAyMKFZuk1
        const uid = state.state.uid
        const url = 'https://trustpay-f2ee3.web.app/borrowInfo?uid='+ uid
        await axios.get(url, {headers})
        .then((response) => { 
            console.log('borrowres', response);
            const borrow = parseFloat(response.data)
            setBorrowed(borrow)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    function handleLiquid() {
        navigate('/liquid', {state:{email: state.state.email, uid: state.state.uid, borrowed: borrowed}})
    }

    function handlePay(){
        // navigate('/pay', {state:{email: state.state.email, uid: state.state.uid}})
        // go back to home with updated borrowing and if borrowed does not exit (condition) let it equal 0 
        const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
        const uid = state.state.uid
        const url = 'https://trustpay-f2ee3.web.app/payback?uid='+uid
        axios.get(url, {headers})
        .then((response) => { 
            console.log('payed back', response);
            navigate('/home', {state: {email:state.state.email, uid: state.state.uid}})
        })
        .catch((error) => {
            console.log(error)
        }); 
         
    }
    function gobackHome(){
        // navigate('/home', {state: {email:state.state.email, uid: state.state.uid}})
        if (toggle =='invisible'){
            setToggle('settle-popup')
        }
        else{
            setToggle('invisible')
        }
    }
    updateEth()
    updateTCT()
    updateBorrow()
    // Get total amount borrowed upto now from contract
    // display and have a variable from the state ? maybe dont need it if we just retrieve that info everytime we go to that 
  return (
    <>

        <div class="header">
            <div class="left_header">
            <a href="home_page.html" class="header_text"> Loanfish </a></div>
     
        </div>
    
        <div class="mainbody">
            <div class="profile">

            <div className="popup-holder"> 
               <div class="details">
                <div className='popup-title'>Dashboard</div> 
                    <div className="subtitle">
                     {email} 
                    </div>
                <div class="detailsbox">
                    <div class ="detailheadings">
                    <p> Collateral (ether)  </p>
                    <p> Currently Borrowing (USDC) </p>
                    <p> Contract Liquidity Pool (USDC) </p> </div>
                
                <div class="detailvalues">
                    <p> {ethAmount} </p>
                    <p> {borrowed.toFixed(2)}</p>
                    <p>{tctAmount} </p> </div>
                </div>
               </div>
               </div>
            </div>
            <div className="buttons-vert  popup-holder buttons-holder">
            <div class="buttons">
                <button onClick ={redirectLender} class="white-button general-button" id="lend_button" > Lend </button> 
                <button onClick ={redirectBorrow} class="white-button general-button" id="borrow_button"> Borrow </button>
                <button onClick ={redirectPay} class="white-button general-button" id="borrow_button"> Settle </button>
            </div>
            </div>
            
        </div>
        <div className={toggle}>
        <button onClick ={gobackHome}>Close</button>
        <div className="buttons-vert">
        <button onClick = {handleLiquid} className="white-button general-button">Liquidate</button>
        <button onClick = {handlePay} className="white-button general-button">Pay</button>
            </div> 
      
        </div>


        {/* <div>Home</div>
        <div>{state.state.email}</div>
        <div>{state.state.uid}</div>
        <div>Amount Borrowed: {borrowed}</div>
        <div>Amount of Eth: {ethAmount}</div>
        <div>Amount of TCT in Pool: {tctAmount}</div>
        <button onClick ={redirectLender}>
            Lend
        </button>
        <button onClick ={redirectBorrow}>
            Borrow
        </button>
        <button onClick ={redirectPay}>
            Pay Back
        </button> */}

    </>
    
  )
}

export default Home