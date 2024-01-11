const { useState } = require("react")

export function useFormInput(IntitialValue){
    const [value,setValue]=useState(IntitialValue);

    // For checkboxes, use e.target.checked
    function handleChange(e){
        setValue(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    }

    return({
        checked: typeof value === 'boolean' ? value : undefined,
    value: typeof value === 'boolean' ? undefined : value,
    onChange: handleChange,
    })
}