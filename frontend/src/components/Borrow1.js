import axios from 'axios'
import React,{useState, useRef, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './styles/stylesheet.css'

function Borrow1() {
  const navigate = useNavigate()
  const state = useLocation()
  const selectRef = useRef()
  const [time, setTime] = useState(0)
  const [succArray, setSuccArray] = useState([])
  const [failArray, setFailArray] = useState([])
  const [toggle, setToggle] = useState('invisible')
  const [cs, setCs] = useState(0)
  const [collateral, SetCollateral] = useState(0)
  const amount = state.state.amount
  const rate = 5.00/100


  function sum(ar) {
    var count = 0;
    for(var i = 0; i < ar.length; i++)
    {
        count = count + ar[i];
    }
    return count
    
  }
  
  async function calc(loan, t){
    const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
    const url = 'https://trustpay-f2ee3.web.app/creditValues?uid='+state.state.uid
    var success_val = 0
    var success = []
    var failure = []
    var failure_val = 0
    var cred = 0
    await axios.get(url,{headers})
    .then((response) => { 
      console.log('res',response);
      console.log('failure array', response.data.failure)
      const s_val = sum(response.data.success.map(x => parseInt(x)))
      const f_val = sum(response.data.failure.map(x => parseInt(x)))
      if (s_val){
        success_val = s_val
      }
      else{
        success_val = 0
      }
      if (f_val){
        failure_val = f_val
      }
      else{
        failure_val = 0
      }
      // success_val = 10
      // failure_val = 100
      console.log(success_val, failure_val)
      // if (!response){
      //   return 0
      // }
      // if (response.success){
      //   success = response.success
      //   success_val = sum(success)
      // }
      // if (response.failure){
      //   failure= response.failure
      //   failure_val = sum(failure)
      // }
      if (success_val==0){
        cred = 0
      }
      else if (success_val >= failure_val){
        const cred = success_val / ((failure_val * 10) + 100 + success_val) * (Math.exp(1-(loan/success_val)))**0.25
        console.log('cred', cred)
        if (cred > 0.9) {
            cred = 0.9
        }
      }
      else{
          const cred = success_val / ((failure_val * 10) + 100 + success_val)

      const coll = ((1 - cred)/(1+rate/(3.15*10**7))**(3.15*10**7*t) + 0.15)
      SetCollateral(coll)
    }
    })
    .catch((error) => {
      console.log(error)
    });
    
}
calc(amount, time)

// function coll(cred, rate, t){

//     const coll = (1 - cred)/(1+rate/(3.15*10**7))**(3.15*10**7*t) + 0.15
//     return coll
// }
  
  // Need time and success and failure arrays 
  // const succ = [1232, 1002, 1212]
  // const fail = [3002, 9231, 8000]
  // console.log(sum(succ))
  // const cred = cal_cred(amount)
  // const collateral = calc(amount, time)
  console.log('collateral',collateral)
  // const collateralDummy = 0.8
  async function handleBorrow(){
    if (collateral*amount > state.state.ethAmount){
      alert('Not enough ethereum. You can add Ethererum to be used as collateral by sending it to this contract address:0x1112a15e083bd889458d5272f2f93647f3b61729')
    }
    else{
      const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
      // navigate('/instructions', {state: {email: state.state.email, uid: state.state.uid} })
      alert('Currently Transferring the USDC...')
      // borrowSet?uid=lBFxf6GG11YZJsga3qWAyMKFZuk1&amount=10
      const amount = state.state.amount
      const uid = state.state.uid
      const url = "https://trustpay-f2ee3.web.app/borrowSet?uid="+uid+"&amount="+amount
      setToggle('setup-popup')
      await axios.get(url, {headers})
      .then((response) => { 
        console.log('transferRes', response);
        setToggle('invisible')
      })
      .catch((error) => {
        console.log(error)
      });
      navigate('/home', {state: {email: state.state.email, uid: state.state.uid} })
    }
    // navigate('/borrow', {state: {collateral: collateralDummy, email: state.state.email, uid: state.state.uid}})
  }
  function goHome(){
    navigate('/home', {state: {email: state.state.email, uid: state.state.uid}})
  }
  function handleChange(e){
    e.preventDefault()
    setTime(parseFloat(selectRef.current.value))
    // console.log(parseFloat(selectRef.current.value) + 3)
  }
  return (
    <>
       <div class="header">
            <div class="left_header">
            <a href="/home" class="header_text"> Loanfish </a></div>
     
        </div>
        <div className="popup-holder popup-center move-down">
        <div className='popup-title'>View Collateral</div> 
        <div className="spacer"></div> 
          
              <label id="timelabel"> Time </label> <p id="timeamount">{time} years</p>
              <input type="range" min ="0" max = "5" step="0.1" defaultValue = {2.5} id="timeinput" ref={selectRef} onChange={handleChange} />
           
                  <div className="usdc colat"> Collateral Multiplier  {(collateral*amount).toFixed(3)} </div>
          
    
   
              <button  onClick = {handleBorrow} className="main-button" id="timebutton">Continue</button> 
      </div>

      {/* <div className= {toggle}>
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div>
          Currently Transferring USDC...
        </div>
      </div> */}


      {/* <div>Interest Rate: {rate*100}%</div>
      <div>Collateral: {collateral* amount}</div>
      <select name="time" id="time" ref ={selectRef} onChange={handleChange}>
        <option>0.5</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <button onClick={handleBorrow}>Continue</button>
      <button onClick={goHome}>Home</button> */}
    </>
  )
  
}

export default Borrow1