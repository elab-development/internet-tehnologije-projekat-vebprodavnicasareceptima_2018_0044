import { createContext, useEffect, useState } from "react";
import { recepti_list } from "../assets/assets";
import { sastojci_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const[cartItems, setCartItems]=useState({});

    const addToCart = (sastojakId) =>{
        if(!cartItems[sastojakId]){
            setCartItems((prev)=>({...prev,[sastojakId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[sastojakId]:prev[sastojakId]+1}))
        }
    }
    
    const removeFromCart = (sastojakId) =>{        
            setCartItems((prev)=>({...prev,[sastojakId]:prev[sastojakId]-1}))   
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])


    const contextValue = {
        recepti_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;