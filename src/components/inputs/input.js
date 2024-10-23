import { useEffect, useState } from "react";

const StyledInputBase = ({
    title,
    placeholder,
    type = "text",
    onInput = () => {},
}) => {
    const [value, setValue] = useState();

    useEffect(() => {
        if (value || value == 0) onInput(value);
    }, [value]);
    return (
        <div className="input-group">
            <p>{title}</p>
            <input
                type={type}
                value={value}
                onInput={(e) => {
                    setValue(e.target.value);
                }}
                placeholder={placeholder}
            />
        </div>
    );
};

export default StyledInputBase;
