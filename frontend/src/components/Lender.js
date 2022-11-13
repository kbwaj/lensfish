import React, {useRef} from 'react'
import axios from 'axios'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import './styles/stylesheet.css'
function Lender() {
    const navigate = useNavigate()
    const amountRef = useRef()
    const state = useLocation()
    async function handleSubmit(e){
        const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
        e.preventDefault()
        alert('This will take a few seconds')
        const amount = amountRef.current.value
        const uid = state.state.uid
        const url = 'https://trustpay-f2ee3.web.app/transferERC?uid='+uid+'&amount='+amount
        // const url =' https://trustpay-f2ee3.web.app/transferERC?uid=lBFxf6GG11YZJsga3qWAyMKFZuk1&amount=1'
        await axios.get(url,{headers})
            .then((response) => { 
                console.log('lenderres', response);
                // {state: {uid: state.state.uid}}
                
                navigate('/home',{state: {email: state.state.email, uid: state.state.uid} })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    function redirect(){
        navigate('/home', {state: {email: state.state.email, uid: state.state.uid} })
    }
  return (
    <>

<div class="profile borrow-hld">
        <div className="popup-holder popup-center">
        <div className='popup-title'>Lend</div> 
                
                 
                <div className='input-holder'>
                    <input type="number" step="0.1" defaultValue ={1} className="amountinput" ref = {amountRef}/> 
                    <div className='subtitle usdc'>USDC</div>
                </div>
                 <br/>
                <div>
                    
                    <button onClick={handleSubmit}  className="main-button extend">Contribute to Liquidity Pool</button>
                </div>
  
        </div>
        </div>


        {/* <button onClick = {redirect}> Home </button>
        <label>
            Amount:
            <input type="number" name="amount" ref={amountRef} id="em-f"/>
        </label>
        <button onClick = {handleSubmit} type="submit" value="Submit" /> */}
    </>

  )
}

export default Lender