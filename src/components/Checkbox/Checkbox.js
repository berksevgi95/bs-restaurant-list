import React from 'react';

import './Checkbox.css'

const Checkbox = ({
    onClick,
    checked,
    label,
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
            className="mx-2 checkbox"
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