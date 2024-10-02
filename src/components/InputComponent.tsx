import { Alert } from "./Alert";
import { Input } from "./ui/input";

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
        <Input
          id={id}
          className={`w-full ${additionalInputStyles} ${hasError && "border-red-500"}`}
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
