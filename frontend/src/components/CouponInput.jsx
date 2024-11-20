import React, {useState, useContext} from 'react'
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const CouponInput = ({setCouponTotal}) => {

    const {getTotalCartAmount} = useContext(StoreContext)
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');

    const applyCoupon = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/coupon/initialize', {
                coupon: couponCode,
                total: getTotalCartAmount(),
                customer_email: 'customer@example.com',
                store_id: '024juy7024xfmur',
                metadata: {  }
            });
            console.log('Coupon Initialized:', response.data);
            setCouponTotal(response.data.data.total)
            setMessage("Ostvarili ste popust od 10%.")
        } catch (error) {
          console.error('Error applying coupon:', error);
          setMessage("Kupon nije odobren.")
        }
    };

  return (
        <div>
            <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={applyCoupon}>Validate</button>
            <p>{message}</p>
        </div>
  )
}

export default CouponInput