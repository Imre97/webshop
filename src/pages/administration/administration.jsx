import { useEffect, useState } from 'react'

import useFetch from '../../hooks/useFetch'

import { AiFillDelete } from 'react-icons/ai'

import Button from '../../components/button/Button'

import './administration.scss'
import Modal from '../../components/modal/Modal'

const Administration = () => {
    const { data, loading, error } = useFetch('https://fakestoreapi.com/products')
    const [products, setProducts] = useState()
    const [modal, setModal] = useState(false)

    const handleDeleteClick = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(json => console.log(json))

        setProducts(products.filter(product => product.id !== id))
    }

    useEffect(() => {
        setProducts(data)
    }, [data])



    return (
        <>
            <div className='container'>
                {loading && <h2 className='loading'>Loading...</h2>}
                {!data && error && <h2 className='error'>{error.message || 'Something went wrong!'}</h2>}
                {products && <div className='administration'>
                    <Button onClick={() => setModal(true)}>Add new item</Button>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>${item.price}</td>
                                        <td onClick={() => handleDeleteClick(item.id)}><AiFillDelete /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}
            </div>
            <Modal modal={modal} setModal={setModal} />
        </>
    )
}

export default Administration