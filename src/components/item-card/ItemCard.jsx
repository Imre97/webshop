import { Link } from 'react-router-dom'

import './itemcard.scss'

const ItemCard = (props) => {
    return (
        <div className='item-card mb-2'>
            <Link to={`/products/${props.item.id}`}>
                <div className='item-card__image mb-2' style={{ backgroundImage: `url(${props.item.image})` }}></div>
                <div className='item-card__detail'>
                    <p>{props.item.title}</p>
                    <p className='item-card__price'>${props.item.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ItemCard