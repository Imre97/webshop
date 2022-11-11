import useFetch from "../hooks/useFetch"

import Hero from "../components/hero/Hero"
import ItemGrid from "../components/item-grid/ItemGrid"

const Home = () => {
    const {data, loading, error} = useFetch('https://fakestoreapi.com/products?limit=5')

    return (
        <div>
            <Hero/>
            {loading && <h2 className="loading">Loading...</h2>}
            {!data && error && <h2 className="error">{error.message || 'Something went wrong!'}</h2>}
            <div className="container">
                <ItemGrid items={data} />
            </div>
        </div>
    )
}

export default Home