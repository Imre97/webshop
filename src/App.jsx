import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { AiOutlineShoppingCart } from 'react-icons/ai'

import './App.scss';

import Header from './components/header/Header';
import RoutesConfig from './routes-config/RoutesConfig';

function App() {
  const items = useSelector(state => state.cart.items)
  
  let numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  return (
    <div className="App">
      <Header />
      <RoutesConfig />
      <span className='cart-button'>
        <Link to='/cart'>
          <AiOutlineShoppingCart />
          <span className='items-number'>{numberOfItems}</span>
        </Link>
      </span>
    </div>
  );
}

export default App;
