import { useParams } from 'react-router-dom'

import useFetch from '../hooks/useFetch'

import ItemGrid from '../components/item-grid/ItemGrid'
import Hero from '../components/hero/Hero'

const Category = () => {
    const { catelog } = useParams()
    const { data, loading, error } = useFetch(`https://fakestoreapi.com/products/category/${catelog}`)


    return (
        <div>
            <Hero />
            <div className='container'>
                {loading && <h2 className='loading'>Loading...</h2>}

                {!data && error && <h2>{error.message || 'Something went wrong!'}</h2>}

                {!loading && <ItemGrid items={data} />}

            </div>
        </div>
    )
}

export default Category