import React, { ReactNode } from 'react'
import style from "./Form.module.css"

interface Props {
    label: string,
    name: string,
    id: string,
    disabled: boolean,
    placeholder: string
    children: ReactNode
}

const SelectContol: React.FC<Props> = ({ label, name, id, disabled, children, placeholder }) => {
    return (
        <>
            <label htmlFor={name} className={style.formLabel}>{label}</label>
            <select
                id={id}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={style.formLabel}>
                {children}
            </select>
        </>
    )
}

export default SelectContol
