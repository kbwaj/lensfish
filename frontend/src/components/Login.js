import React, {useEffect, useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link,useNavigate } from 'react-router-dom'
import auth from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth'
function Login() {
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    // const{login} = useAuth()
    function login(email,password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            // setUser({email: user.email, uid: user.uid})
            // ...
          })
          .catch((error) => {
            console.log('error in login')
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        

    }
    function handleSubmit(e){
        console.log("hs")
        setUser({email: emailRef.current.value, password: passwordRef.current.value})
        e.preventDefault();
        const currUser = login(emailRef.current.value,passwordRef.current.value)

        // when error redirect to error 404 page
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     // ...
        //   })
        // .catch((error) => {
        //     setError(true)
      
        //   });
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
              navigate('/home',{ state:{email: emailRef.current.value, uid:uid}})
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
        console.log('user',currUser)
        
        // if (!error){
        //     navigate('/',{ state:currUser})
        // }
        // signup("k@g.com","nameRef.current.value", "aaaaaaaaa")


    }

    // useEffect(() => {
    //     return
    // },[error])
  return (
    <>
        {/* {error && (
            <div>
                The email or password is incorrect
            </div>
        )} */}
        <label>
            Email/Username:
            <input type="text" name="email" ref={emailRef} id="em-f"/>
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

export default Login