import ReactDOM from 'react-dom'
import { useState, useRef } from 'react'


import './modal.scss'
import Button from '../button/Button'

const Backdrop = (props) => {


    return (
        <div className={`backdrop ${props.modal ? 'modal-active' : ''}`} onClick={() => props.setModal(prev => { return { ...prev, active: false } })}></div>
    )
}


const ModalOverlay = props => {
    const [formInputValidity, setFormInputValidity] = useState({
        title: true,
        price: true,
        description: true,
        image: true,
        category: true
    })

    const titleInputRef = useRef()
    const priceInputRef = useRef()
    const descriptionInputRef = useRef()
    const imageInputRef = useRef()
    const categoryInputRef = useRef()


    const isEmpty = value => value.trim().length == ''

    const confirmHandler = (e) => {
        e.preventDefault()

        const enteredTitle = titleInputRef.current.value
        const enteredPrice = priceInputRef.current.value
        const enteredDescription = descriptionInputRef.current.value
        const enteredImage = imageInputRef.current.value
        const enteredCategory = categoryInputRef.current.value

        const enteredTitleIsValid = !isEmpty(enteredTitle)
        const enteredPriceIsValid = !isEmpty(enteredPrice)
        const enteredDescriptionIsValid = !isEmpty(enteredDescription)
        const enteredImageIsValid = !isEmpty(enteredImage)
        const enteredCategoryIsValid = !isEmpty(enteredCategory)

        setFormInputValidity({
            title: enteredTitleIsValid,
            price: enteredPriceIsValid,
            description: enteredDescriptionIsValid,
            image: enteredImageIsValid,
            category: enteredCategoryIsValid
        })

        const formIsValid = enteredTitleIsValid && enteredPriceIsValid && enteredDescriptionIsValid && enteredImageIsValid && enteredCategoryIsValid

        if(!formIsValid) {
            return
        }

        fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: enteredTitle,
                    price: +enteredPrice,
                    description: enteredDescription,
                    image: enteredImage,
                    category: enteredCategory
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))

            closeModal()
    }

    const closeModal = () => {
        titleInputRef.current.value = ''
        priceInputRef.current.value = ''
        descriptionInputRef.current.value = ''
        imageInputRef.current.value = ''
        categoryInputRef.current.value = ''
        props.setModal(false)

    }

    return (
        <div className={`modal ${props.modal ? 'modal-active' : ''}`}>
            <form className='modal-form' onSubmit={confirmHandler}>
                <div className={`control ${formInputValidity.title ? '' : 'invalid'}`}>
                    <label htmlFor="title">Title</label>
                    <input id='title' type='text' ref={titleInputRef} />
                </div>
                <div className={`control ${formInputValidity.price ? '' : 'invalid'}`}>
                    <label htmlFor="price">Price</label>
                    <input id='price' type='number' ref={priceInputRef} />
                </div>
                <div className={`control ${formInputValidity.description ? '' : 'invalid'}`}>
                    <label htmlFor="description">Description</label>
                    <input id='description' type='text' ref={descriptionInputRef} />
                </div>
                <div className={`control ${formInputValidity.image ? '' : 'invalid'}`}>
                    <label htmlFor="image">Image</label>
                    <input id='image' type='text' ref={imageInputRef} />
                </div>
                <div className={`control ${formInputValidity.category ? '' : 'invalid'}`}>
                    <label htmlFor="category">Category</label>
                    <input id='category' type='text' ref={categoryInputRef} />
                </div>

                <div className='actions'>
                    <Button type={'button'} onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button type={'submit'} className='submit'>Confirm</Button>
                </div>

            </form>
        </div>
    )
}


const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop modal={props.modal} setModal={props.setModal} />, document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalOverlay modal={props.modal} setModal={props.setModal}>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
        </>
    )
}

export default Modal