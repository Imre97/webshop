import ItemCard from '../item-card/ItemCard'
import './itemgrid.scss'

const ItemGrid = (props) => {
    return (
        <div className='item-grid container'>      
                {props.items.map(item => {
                    return <ItemCard key={item.id} item={item} />
                })}
        </div>
    )
}

export default ItemGrid