import useFetch from "../../hooks/useFetch"

import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { cartActions } from "../../components/store/cart"

import Button from '../../components/button/Button'

import './detail.scss'

const Detail = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`)

    const handleClick = ({id, title, price, amount}) => {
        dispatch(cartActions.addItemToCart({id, title, price, amount}))
    }
    
    return (
        <div className="container">
            {loading && <h2 className="loading">Loading...</h2>}
            {!data && error && <h2 className="error">{error.message || 'Something went wrong!'}</h2>}
            {!loading && data && <div className="item-detail section">
                <img className="item-detail__image" src={data.image} alt={data.title}/>
                <div className="item-detail__content">
                    <h2 className="title mb-3">{data.title}</h2>
                    <p className="description mb-2">{data.description}</p>
                    <div className="rating mb-2">Rating: {data.rating?.rate} ({data.rating?.count})</div>
                    <h3 className="price mb-2">${data.price}</h3>
                    <Button onClick={() => handleClick({id: data.id, title: data.title, price: data.price, amount: 1})}>Add item to cart</Button>
                </div>
            </div>}
        </div>
    )
}

export default Detail