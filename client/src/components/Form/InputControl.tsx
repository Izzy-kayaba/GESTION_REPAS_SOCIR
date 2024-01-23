import React from 'react'
import style from "./Form.module.css"

interface InputProps {
    label: string,
    type: string,
    id: string,
    name: string,
    value: string,
    placeholder: string
    handleChange: (e: any) => void
}

const InputControl: React.FC<InputProps> = ({ label, id, value, type, name, placeholder, handleChange }) => {
    return (
        <>
            <label htmlFor={name} className={style.formLabel}>{label}</label>
            <input type={type}
                name={name}
                id={id}
                value={value}
                className={style.formControl}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </>
    )
}

export default InputControl
