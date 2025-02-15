import React from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
//import trash from '../trash.svg';


export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3" style={{ color: 'yellow' }}>The Cart is Empty!</div>
            </div>
        )
    }


    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        //console.log(data, localStorage.getItem("userEmail"), new Date())
        console.log(data)
        let response = await fetch("http://localhost:5000/api/orderData", {
            //credentials: 'include',
            /*Originhttp://localhost:3000/login,*/
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("ORDER JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({type: "DROP"})
        }
    }

let totalPrice = data.reduce((total, coffee) => total + coffee.price, 0)
    return (
        <div>

        {console.log(data)}
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col' style={{ display: 'none' }}>Image</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((coffee, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{coffee.name}</td>
                                <td>{coffee.qty}</td>
                                <td>{coffee.size}</td>
                                <td>{coffee.price}</td>
                                <td style={{ display: 'none' }}>{coffee.img}</td>
                                <td><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        ))}
                </tbody>
                </table>
                <div><h1 className="fs-2" style={{ color: "yellow", marginTop:"50px" }}>Total Price: {totalPrice}/-</h1></div>
        <div>
        <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
        </div>
        </div >
        </div >
    )
    }