import React, {useState, useContext} from 'react'
import './CouponInput.css'
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const CouponInput = () => {

    const {getTotalCartAmount,setCouponTotal} = useContext(StoreContext)
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
            setCouponTotal(response.data.data.discount)
            setMessage("Ostvarili ste popust od 10%.")
        } catch (error) {
          console.error('Error applying coupon:', error);
          setCouponTotal(0)
          setMessage("Kupon nije odobren.")
        }
    };

  return (
        <div className='coupon-container'>
            <div className="coupon-input">
            <input
                type="text"
                placeholder="Upisi kod"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={applyCoupon}>Iskoristi kod</button>
            </div>
            <p>{message}</p>
        </div>
  )
}

export default CouponInput