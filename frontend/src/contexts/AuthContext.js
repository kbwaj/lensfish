import React from 'react'
import {useContext,useState,useEffect} from 'react'
import auth from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth'
const AuthContext = React.createContext()



export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null)
    // const [currentUser,setCurrentUser] = useState()
    // const [loading,setLoading] = useState(true)

    function signup(email,name,password) {
        console.log("signup")
        var user={}
        console.log('hi')
        createUserWithEmailAndPassword(auth, email,password).then((userCredential) => {
            console.log("success")
            // Signed in 
            user = userCredential.user;
            console.log(user)
            setUser({email: user.email, uid: user.uid})
            // ...s
          }).catch(err=>{
            console.log("failue")
            console.log(err);
          })

        return user

    }
    function login(email,password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            console.log('error in login')
            const errorCode = error.code;
            const errorMessage = error.message;
          });

    }

    function logout () {
        return signOut()
        
    }

    // function createPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }

    // function updateEmail (email) {
    //    return currentUser.updateEmail(email)
    // }


    // function updatePassword (password) {
    //     return currentUser.updatePassword(password)
    // }




    // useEffect(() => {
    //     // const unsubscribe = onAuthStateChanged(user => {
    //     //   setCurrentUser(user)
    //     //   setLoading(false)
    //     // })
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //           const uid = user.uid;
    //           setCurrentUser(user)
    //           // ...
    //         }
    //       });
    //     return unsubscribe
    //   }, [])





    const value = {
        user,
        signup,
        login,
        logout,
        // createPassword,
        // updateEmail,
        // updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
