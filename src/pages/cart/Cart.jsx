import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import CartItem from './cartItems/CartItem'

import './cart.scss'

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)


    return (
        <div className='container cart-items'>
            <ul>
                {cartItems.map(item => {
                    return <CartItem key={item.id} item={item} />
                })}
            </ul>
            {cartItems.length > 0 ? <div>
                <span className='total-amount'>${totalAmount.toFixed(2)}</span>
            </div> : <h2>Empty</h2>}
        </div>
    )
}

export default Cart