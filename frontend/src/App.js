
import {AuthProvider} from './contexts/AuthContext'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import Lender from './components/Lender'
import Borrow1 from './components/Borrow1'
import Borrow from './components/Borrow'
import PayBack from './components/PayBack'
import Liquid from './components/Liquid'
import Instructions from './components/Instructions'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'

function App() {

  return (

    // <AuthProvider>

    //        <Signup/>
         
    // </AuthProvider> 
    // <Signup/>
    <Router>
        <AuthProvider>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            
            <Route exact path="/signup" element ={<Signup/>}/>
            <Route exact path="/login" element ={<Login/>}/>
            <Route exact path="/lender" element ={<Lender/>}/>
            <Route exact path="/borrow1" element ={<Borrow1/>}/>
            <Route exact path="/borrow" element ={<Borrow/>}/>
            <Route exact path="/payback" element ={<PayBack/>}/>
            <Route exact path="/liquid" element ={<Liquid/>}/>
            <Route exact path="/instructions" element ={<Instructions/>}/>
          </Routes>
         </AuthProvider> 
    </Router>  
  );
}

export default App;
