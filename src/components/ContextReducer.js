import React, {createContext, useReducer, useContext} from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext(); 

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]

		case "REMOVE":
			let newArr = [...state]
			newArr.splice(action.index, 1)
			return newArr;

		case "DROP":
			let empArray = []
			return empArray;

		case "UPDATE":
			let arr = [...state]
			arr.find((coffee, index) => {
				if (coffee.id === action.id) {
					console.log(coffee.qty, parseInt(action.qty), action.price + coffee.price)
					arr[index] = { ...coffee, qty: parseInt(action.qty) + coffee.qty, price: action.price + coffee.price }
				}
				return arr;
			})
			return arr;
		default:
			  console.log("Error in Reducer");

	}
}

export const CartProvider = ({children})=> {
	const [state, dispatch] = useReducer(reducer, [])
	return(
		<CartDispatchContext.Provider value={dispatch}>
		   <CartStateContext.Provider value={state}>
		      {children}
		   </CartStateContext.Provider>
		</CartDispatchContext.Provider>
	)
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);