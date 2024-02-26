import React, { FC, ReactNode } from 'react'


interface ButtonProps {
    size?: "medium",
    isDisabled?: boolean | undefined,
    onClick: () => void,
    children: ReactNode
}

const Button: FC<ButtonProps> = ({ size, onClick, isDisabled, children }: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    )
}

const ButtonWithIcon: FC<ButtonProps> = ({ size, onClick, isDisabled, children }: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    )
}

export { Button, ButtonWithIcon };


