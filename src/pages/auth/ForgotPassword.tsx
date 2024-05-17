import { Link } from "react-router-dom";
import { InputComponent } from "../../components";
import { ButtonComponent } from "../../components";
import { forgotPasswordService } from "./services/Auth.service";
import { useFetchAndLoad } from "../../hooks";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utilities/toasts";

import forgotPassImage from './../../assets/undraw_forgot_password_re_hxwm.svg'
import logoImage from './../../assets/Google Tasks.svg'

export const ForgotPassword = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email } = data;

    try {
      const response = await callEndpoint(
        forgotPasswordService({
          email,
        })
      );
      successToast("Recovery password sent successfully");
    } catch (error: any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex gap-10">
      <div className="w-full m-auto rounded-[50%] hidden lg:flex items-center justify-center bg-gradient-to-r max-w-screen-md p-4">
        <img
          src={forgotPassImage}
          className="w-full max-w-md"
          alt="login image"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center w-full max-w-screen-md">
        <img
          src={logoImage}
          width="200"
          height="200"
          className="text-center mx-auto max-w-md"
          alt="login image"
        />
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-4xl">Recover your password</h2>
          <span className="text-md text-gray-400">
            We'll send you an email with the instructions to reset your password
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 py-8 flex flex-col gap-2"
        >
          <InputComponent
            labelText="Email"
            id="email"
            type="text"
            placeholder="Email"
            register={register}
            additionalInputStyles={errors.email && "border-b-red-300"}
            validationSchema={{
              required: {
                value: true,
                message: "Email is required",
              },
              minLength: {
                value: 6,
                message: "Please enter a minimum of 6 characters",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
            errors={errors}
          />

          <ButtonComponent
            loading={loading}
            type="submit"
            btnText="Send instructions"
            addtionalStyles="mt-4"
            styleType="primary"
          />
          <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
            <Link className="ml-auto text-[15px]" to="/">
              Back to <span className="text-primary underline">Log In</span>
            </Link>
          </nav>
        </form>
      </div>
    </div>
  );
};
