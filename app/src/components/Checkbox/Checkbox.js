import React from 'react';

import './Checkbox.css'

const Checkbox = ({
    onClick,
    checked,
    label,
    className,
    ...props
}) => {

    const handleOnClick = () => {
        if (onClick)
            onClick({
                target: {
                    value: !checked
                }
            })
    }

    return (
        <div
            className={`checkbox ${className || ''}`}
            onClick={handleOnClick}
        >
            <input
                type="checkbox"
                checked={checked}
            />
            <label>
                {label}
            </label>
        </div>
    )
}

export default Checkbox;