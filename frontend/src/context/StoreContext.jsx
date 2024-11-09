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

    const getTotalCartAmount =() => {
        let totalAmount =0;
        for (const sastojakId of Object.keys(cartItems)){
            if(cartItems[sastojakId]>0){
                let itemInfo = sastojci_list.find(sastojak => sastojak.id === parseInt(sastojakId));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[sastojakId];
                }
            }
        }
        return totalAmount;
    }


    const contextValue = {
        recepti_list,
        sastojci_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;