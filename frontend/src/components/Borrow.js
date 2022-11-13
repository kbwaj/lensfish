import React,{useRef} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './styles/stylesheet.css'
function Borrow() {
    const amountRef =useRef()
    const navigate = useNavigate()
    const state=useLocation()
    function redirect(){
        navigate('/home', {state: {email: state.state.email, uid: state.state.uid}})
    }
    function handleSubmit(e){
        e.preventDefault()
        // Borrow with contract
        navigate('/borrow1', {state: {amount: amountRef.current.value, email: state.state.email, uid: state.state.uid, ethAmount: state.state.ethAmount}})
    }
  return (
    <>
         <div class="header">
            <div class="left_header">
            <a href="home_page.html" class="header_text"> Loanfish </a></div>
     
        </div>
        <div class="profile borrow-hld">
        <div className="popup-holder popup-center">
        <div className='popup-title'>Borrow</div> 
                
                 
                <div className='input-holder'>
                    <input type="number" step="0.1" defaultValue ={1} className="amountinput" ref = {amountRef}/> 
                    <div className='subtitle usdc'>USDC</div>
                </div>
                 <br/>
                <div>
                    
                    <button onClick={handleSubmit} type="submit" className="main-button extend">View Collateral</button>
                </div>
  
        </div>
        </div>
        {/* <button onClick = {redirect}> Home </button>
        <label>
            Amount:
            <input type="number" name="amount" ref={amountRef} id="em-f"/>
        </label>
        <button onClick={handleSubmit}>Continue</button> */}
    </>
  )
}

export default Borrow