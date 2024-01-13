import React from 'react'
import style from "./Form.module.css"

interface InputProps {
    label: string,
    type: string,
    name: string,
    placeholder: string
}

const InputControl: React.FC<InputProps> = ({ label,type, name,placeholder }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} className={style.formControl} placeholder={placeholder} />
        </>
    )
}

export default InputControl
