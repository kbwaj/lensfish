import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import auth from '../firebase'
import { Link,useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth'
import axios from 'axios'
function Signup() {
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const addressRef = useRef()
    const privateKeyRef = useRef()
    const pneumonicRef = useRef()
    const test = useRef()
    // const {signup}  = useAuth()
    const navigate = useNavigate()

    // test.addEventListener("click", ()=>{
    //     console.log('hi')
    //     // await signup(emailRef.current.value,nameRef.current.value, passwordRef.current.value)
    //     signup(document.getElementById("em-f").value,"nameRef.current.value", document.getElementById("pw-f").value)



    // })

    
    function signup(email,name, key, address,password, pneumonic) {
        console.log("signup")
        var user={}
        console.log('hi')
        
        createUserWithEmailAndPassword(auth, email,password).then((userCredential) => {
            const headers =  {"Access-Control-Allow-Origin": 'http://localhost:3000'}
            console.log("success")
            // Signed in 
            user = userCredential.user;
            console.log(user)
            // firestore
            // const email = emailRef.current.value
            // const name = nameRef.current.value
            const uid = user.uid
            // const privKey = privateKeyRef.current.value
            // const address = addressRef.current.value
            const new_pne = pneumonic.replaceAll(' ','+')
            const url = "https://trustpay-f2ee3.web.app/createUser?email="+email+"&name="+name+"&uid="+uid+"&privateKey="+key+"&address="+address+'&mnemonic='+new_pne
            axios.get(url, {headers})
            .then((response) => { 
                console.log('res', response);
            })
            .catch((error) => {
                console.log(error)
            });
            // https://trustpay-f2ee3.web.app/createUser?email=a@gmail.com&name=amu&uid=testuid1&privateKey=0xdfwedfwe&address=cwecwcdwcwdec
            // ...s
          }).catch(err=>{
            console.log("failue")
            console.log(err);
          })

        return user

    }
    async function handleSubmit(e){
        console.log("hs")
        e.preventDefault();
        await signup(emailRef.current.value,nameRef.current.value, privateKeyRef.current.value, addressRef.current.value, passwordRef.current.value, pneumonicRef.current.value)

        
        navigate('/login' )
        // signup("k@g.com","nameRef.current.value", "aaaaaaaaa")


    }
    // handleSubmit();
  return (

    
    <>
  
        <label>
            Email/Username:
            <input type="text" name="email" ref={emailRef} id="em-f"/>
        </label>
        <label>
            Name:
            <input type="text" name="name" ref={nameRef} id="nm-f"/>
        </label>
        <label>
            Address:
            <input type="text" name="address" ref={addressRef} id="nm-f"/>
        </label>
        <label>
            Private Key:
            <input type="text" name="privkey" ref={privateKeyRef} id="nm-f"/>
        </label>
        <label>
            Mnemonic:
            <input type="text" name="privkey" ref={pneumonicRef} id="nm-f"/>
        </label>
        <label>
            Password:
            <input type="password" name="password" ref={passwordRef} id="pw-f"/>
        </label>
        {/* <div id='test' onClick = {handleref={test}>login</div> */}
        <button onClick = {handleSubmit} type="submit" value="Submit" />
   
    </>
  )
}

export default Signup