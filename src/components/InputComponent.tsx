import * as React from 'react';
import { getInputMessage } from '../utilities/errorsHandler';
import { Alert } from './Alert';

export const InputComponent = ({
  id,
  labelText,
  errors,
  disabled,
  placeholder,
  type,
  value,
  register,
  validationSchema,
  additionalContainerStyles,
  additionalInputStyles,
}: any) => {
  return (
    <div className="">
      <div className={`flex flex-col gap-1 ${additionalContainerStyles}`}>
        <label htmlFor={id} className="font-semibold text-sky-900">
          {labelText}
        </label>
        <input
          id={id}
          className={`w-full text-sky-900 px-4 py-2 box-border border-b-2 outline-0 focus:border-b-sky-500 ${additionalInputStyles}`}
          tabIndex={0}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          {...register(id, validationSchema)}
        />
        {errors?.[id] && <Alert msg={errors?.[id]?.message} />}
      </div>
    </div>
  );
};
