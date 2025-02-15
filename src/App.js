//import logo from './logo.svg';
import './App.css';
import Home from './screens/Home.js'
import Login from './screens/Login.js'
import SignUp from './screens/SignUp.js'
import MyOrders from './screens/MyOrder'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import { CartProvider } from './components/ContextReducer';


function App() {
    return (
        <CartProvider>
        <Router>
            <div><Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                    <Route path='/createuser' element={<SignUp />} />
                    <Route path='/myOrderData' element={<MyOrders />} />
                </Routes>
           </div>


            </Router>
        </CartProvider>
  );
}

export default App;
