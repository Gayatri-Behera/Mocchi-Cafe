import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
//import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

const Navbar = (props) => {

    const [cartView, setCartView] = useState(false);
    let data = useCart();

    //localStorage.setItem('temp, 'first');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    /*const loadCart = () => {
        setCartView(true);
    }*/

  //  const items = useCart();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic" to="/">Mochi Cafe</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ fontWeight: "bold" }}>
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">HOME</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrderData">MY ORDERS</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">LOG IN</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SIGN UP</Link>
                            </div>
                            :
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>MY CART {" "}
                                    <Badge pill bg="danger">{data.length}</Badge></div>
                                {cartView ? <Modal onClose = {() => setCartView(false)}><Cart/></Modal>: ""}
                                <div className="btn bg-white text-success mx-2" onClick={handleLogout}>LOG OUT</div> 
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navbar;