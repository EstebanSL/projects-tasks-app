import * as React from 'react';

export const InputComponent = ({
  id,
  labelText,
  errors,
  disabled,
  onChange,
  placeholder,
  required,
  type,
  value,
}: any) => {
  const inputRef = React.useRef<any>(null);

  const handleClick = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="">
      <div onClick={handleClick} className="flex flex-col gap-1">
        <label htmlFor={id} className="font-bold text-sky-900">
          {labelText}
        </label>
        <input
          id={id}
          className="w-full text-sky-900 px-4 py-2 rounded-md border-2 border-gray-300 outline-none focus:border-sky-900 focus:border-2 bg-gray-200"
          ref={inputRef}
          tabIndex={0}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
        />
      </div>
      {errors && !value && required && <p>Required!</p>}
    </div>
  );
};
