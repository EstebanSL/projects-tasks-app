import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { InputComponent } from "../../components";
import { ButtonComponent } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { LoginUserService } from "./services/Auth.service";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { errorToast } from "../../utilities/toasts";

import loginImage from './../../assets/undraw_login_re_4vu2.svg'
import logoImage from './../../assets/Google Tasks.svg'

export const Login = () => {
  /**
   * [useForm]
   * Form that stores the user values
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  /**
   * [navigate]
   * Navigation function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * [useAuth]
   * Auth context variables and functions
   */
  const { setAuth } = useAuth();

  /**
   * [loading] - Defines if the request is being processed
   * [callEndpoint] - Method that make the request
   */
  const { loading, callEndpoint } = useFetchAndLoad();

  /**
   * [loginUser]
   * @param data User credentials
   */
  const loginUser = async (data: Login) => {
    const { email, password } = data;

    try {
      const response = await callEndpoint(
        LoginUserService({ email, password })
      );
      localStorage.setItem("token", response.token);
      setAuth(response);
      navigate("/projects");
    } catch (error: any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  //Template
  return (
    <div className="w-full min-h-screen flex gap-10">
      <div className="w-full m-auto rounded-[50%] hidden lg:flex items-center justify-center bg-gradient-to-r max-w-screen-md p-4">
        <img
          src={loginImage}
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
          <h2 className="text-4xl">Welcome back</h2>
          <span className="text-md text-gray-400">
            Please login to your account
          </span>
        </div>
        <form
          onSubmit={handleSubmit(loginUser)}
          className="bg-white p-8 flex flex-col gap-2"
        >
          <InputComponent
            id="email"
            type="text"
            placeholder="Email"
            register={register}
            hasError={errors.email}
            validationSchema={{
              required: {
                value: true,
                message: "Email is required",
              },
              minLength: {
                value: 3,
                message: "Please enter a minimum of 3 characters",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
            errors={errors}
          />

          <InputComponent
            id="password"
            type="password"
            placeholder="Password"
            additionalContainerStyles="mt-4"
            hasError={errors.password}
            register={register}
            validationSchema={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Please enter a minimum of 6 characters",
              },
            }}
            errors={errors}
          />
          <Link
            className="ml-auto text-[15px] text-gray-400 hover:underline"
            to="/reset-password"
          >
            Forgot your password?
          </Link>

          <ButtonComponent
            loading={loading}
            type="submit"
            btnText="Log In"
            addtionalStyles="mt-4"
            styleType="primary"
          />

          <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
            <Link className="ml-auto text-gray-400 text-[15px]" to="/register">
              Don't have an account? <span className="text-primary underline">Register here!</span>
            </Link>
          </nav>
        </form>
      </div>
    </div>
  );
};
