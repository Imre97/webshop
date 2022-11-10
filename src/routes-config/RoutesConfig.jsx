import { Routes, Route } from 'react-router-dom'
import Administration from '../pages/administration/administration'
import Cart from '../pages/cart/Cart'
import Category from '../pages/Category'
import Detail from '../pages/detail/Detail'
import Home from '../pages/Home'

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/products/category/:catelog' element={ <Category />} />
            <Route path='/products/:id' element={ <Detail />} />
            <Route path='/administration' element={ <Administration />} />
            <Route path='/cart' element={ <Cart />} />
        </Routes>
    )
}

export default RoutesConfig