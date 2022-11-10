import './button.scss'

const Button = (props) => {
    return (
        <button type={props.type || 'button'} className={`btn ${props.className ? props.className : ''}`} onClick={props.onClick ? props.onClick : null}>
            {props.children}
        </button>
    )
}

export default Button