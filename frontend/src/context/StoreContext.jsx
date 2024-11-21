import { createContext, useEffect, useState } from "react";
import { kategorija_list, recepti_list, vrste_obroka } from "../assets/assets";
import { sastojci_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    //Autentifikacija i autorizacija
    const [token,setToken] = useState();
    const [userRole,setUserRole] =useState();
    function addToken(token){
      setToken(token);
    }
    function addUserRole(userRole){
      setUserRole(userRole);
    }
    function removeToken() {
      setToken(null);
      setUserRole(null);
    }
    function removeUserRole() {
      setUserRole(null);
    }

    //korpa
    const[cartItems, setCartItems]=useState({});

    const addToCart = (id,kol) =>{
        let config = {
            method: 'post',
            url: 'http://localhost:8000/api/korpa/dodaj',
            headers: { 
              Authorization: `Bearer ${token}`
            },
            data : { sastojak_id:id, kolicina:kol } 
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            updateCartItems(token)
          })
          .catch((error) => {
            console.log(error);
          });
    }    

    const removeFromCart = (sastojakId) => {              
        let config = {
            method: 'delete',
            url: `http://localhost:8000/api/korpa/obrisi/${sastojakId}`,
            headers: { 
             Authorization: `Bearer ${token}`
            }
        };
        
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            updateCartItems(token);
        })
        .catch((error) => {
            console.log(error);
        });
     };

    const updateQuantity= (id,quantity) => {
       if(quantity>0){ let config = {
            method: 'put',
            url: `http://localhost:8000/api/korpa/azuriraj/${id}`,
            headers: { 
                Authorization: `Bearer ${token}`
            },
            data : {kolicina:quantity}
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            updateCartItems(token)
          })
          .catch((error) => {
            console.log(error);
          });}
    } 



    const getTotalCartAmount =() => {
        let totalAmount =0;
        if (Array.isArray(cartItems)) {
          cartItems.forEach((item) => {
              totalAmount += item.cena * item.pivot.kolicina;
          });
        }
        return totalAmount;
    }

    function updateCartItems(access_token){
        let config = {
            method: 'get',
            url: 'http://localhost:8000/api/korpa',
            headers: { 
              Authorization: `Bearer ${access_token}`
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data.sastojci));
            setCartItems(response.data.sastojci)
          })
          .catch((error) => {
            console.log(error);
          });
     }

     const [couponTotal, setCouponTotal] = useState(0)

    const contextValue = {
        recepti_list,
        kategorija_list,
        sastojci_list,
        cartItems,
        vrste_obroka,
        token,
        userRole,
        couponTotal,
        addToken,
        removeToken,
        addUserRole,
        removeUserRole,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        updateQuantity,
        updateCartItems,
        setCouponTotal
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;