import { useRef, useState, useEffect } from 'react'

import useFetch from '../../hooks/useFetch'

import { Link, useLocation } from 'react-router-dom'

import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'

import './header.scss'

const Header = () => {
    const [mobileMenuActive, setMobileMenuActive] = useState(false)

    const headerRef = useRef()
    const navigationRef = useRef()

    const { data } = useFetch('https://fakestoreapi.com/products/categories')

    const { pathname } = useLocation()

    const active = data.findIndex(x => x === decodeURI(pathname).split('/').reverse()[0])

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }

        window.addEventListener('scroll', shrinkHeader)

        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])


    const openMobileMenu = () => {
        navigationRef.current.classList.add('active')
        setMobileMenuActive(true)
    }

    const closeMobileMenu = () => {
        navigationRef.current.classList.remove('active')
        setMobileMenuActive(false)
    }


    return (
        <div className="header" ref={headerRef}>
            <div className="header-wrap container">
                <Link to='/'>
                    <h1>
                        ReactShop
                    </h1>
                </Link>
                <ul className='header-nav' ref={navigationRef}>
                    {data.map((item, i) => {
                        return (
                            <li key={i} className={`${i === active ? 'active' : ''}`} onClick={closeMobileMenu}>
                                <Link to={`/products/category/${item}`}>
                                    {item}
                                </Link>
                            </li>
                        )
                    })}
                    <li className='admin-menu' onClick={closeMobileMenu}>
                        <Link to={`/administration`}>
                            (admin)
                        </Link>
                    </li>
                </ul>
                {mobileMenuActive ? <AiOutlineClose className='mobile-menu__button' onClick={closeMobileMenu} /> : <FiMenu className='mobile-menu__button' onClick={openMobileMenu} />}
            </div>
        </div>
    )
}

export default Header