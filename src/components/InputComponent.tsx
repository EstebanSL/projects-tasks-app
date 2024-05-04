import { Alert } from "./Alert";

export const InputComponent = ({
  id,
  hasError,
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
        <input
          id={id}
          className={`w-full text-slate-800 p-4 box-border border-2 bg-gray-100 rounded-[20px] outline-0 focus:border-primary ${additionalInputStyles} ${
            hasError ? "border-red-500" : "border-gray-100"
          }`}
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
