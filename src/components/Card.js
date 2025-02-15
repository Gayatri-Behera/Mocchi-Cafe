import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    const priceRef = useRef();
    let priceOptions = Object.keys(options);
    //const coffeeItems = props.coffeeItems;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {
        let coffee = [];
        for (const item of data) { 
            if (item.id === props.coffeeItems._id) {
                coffee = item;
                break;
            }
        }
        if (coffee !== []) {
            if (coffee.size === size) {
                await dispatch({ type: "UPDATE", id: props.coffeeItems._id, price: finalPrice, qty: qty })
                return 
            }
            else if (coffee !== []) {
                await dispatch({ type: "ADD", id: props.coffeeItems._id, name: props.coffeeItems.name, price: finalPrice, qty: qty, size: size, img: props.coffeeItems.img })  //code to assign array values to cart
                return
                //await console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: props.coffeeItems._id, name: props.coffeeItems.name, price: finalPrice, qty: qty, size: size, img: props.coffeeItems.img })  
    };

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <>
            <div style={{ margin: "50px" }}>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.coffeeItems.img} className="card-img-top" alt="NOT FOUND" style={{ height: "160px", border: "2px solid grey" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.coffeeItems.name}</h5>
                        <p className="card-text">{props.desc }</p>
                        <div className="container w-100">
                            <select className="m-2 h-2 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className="m-2 h-2 bg-success rounded" ref={priceRef}  onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data} > {data} </option>
                                })}
                            </select>
                            <div className="d-inline h-100">Total Price: ₹{finalPrice}</div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
