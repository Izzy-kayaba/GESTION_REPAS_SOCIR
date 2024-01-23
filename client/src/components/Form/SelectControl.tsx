import React, { ReactNode } from 'react'
import style from "./Form.module.css"

interface Props {
    label: string,
    name: string,
    id: string,
    value: string,
    disabled: boolean,
    defaultMessage: string,
    options: any,
    option: string,
    onChange: (e: any) => void
}

const SelectContol: React.FC<Props> = ({ label, name, id, disabled, value, onChange, options, option, defaultMessage }) => {
    return (
        <>
            <label htmlFor={name} className={style.formLabel}>{label}</label>
            <select
                className={style.formControl}
                id={id}
                name={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
            >
                <option value=""> {defaultMessage} </option>
                {options?.data.map((item: any) => {
                    const values = item.attributes;
                    return (
                        <option value={item?.id} key={item.id}>
                            {values[option]}
                        </option>
                    );
                })}

            </select>
        </>
    )
}

export default SelectContol;
