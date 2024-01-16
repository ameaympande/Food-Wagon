import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

const Input = ({ name, type, placeholder, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputClass = `mt-1 p-2 border rounded-md w-full focus:outline-none ${error ? 'border-text-red border-2' : 'focus:border-text-primary'}`;

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type={showPassword ? 'text' : type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                />
                {type === 'password' && (
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm font-semibold text-text-red">{error}</p>}
        </div>

    );
};

export default Input;
