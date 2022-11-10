import { useDispatch } from 'react-redux'

import { cartActions } from '../../../components/store/cart'

import Button from "../../../components/button/Button"

import './cartItem.scss'

const CartItem = (props) => {
    const disPathc = useDispatch()

    const onRemove = (id) => {
        disPathc(cartActions.removeOneItemFromCart(id))
    }


    const onAdd = (id) => {
        disPathc(cartActions.addOneItemToCart(id))
    }


    return (
        <li className="cart-item">
            <div>
                <h2>{props.item.title}</h2>
                <div className='summary'>
                    <span className='price'>${props.item.price}</span>
                    <span className='amount'>x {props.item.amount}</span>
                </div>
            </div>
            <div className='actions'>
                <Button onClick={() => onRemove(props.item.id)}>−</Button>
                <Button onClick={() => onAdd(props.item.id)}>+</Button>
            </div>
        </li>
    )
}

export default CartItem