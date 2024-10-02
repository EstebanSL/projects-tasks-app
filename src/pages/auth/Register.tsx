import { Link, useNavigate } from "react-router-dom";
import { useFetchAndLoad } from "../../hooks";
import { RegisterUserService } from "./services";
import { ButtonComponent, InputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../utilities/toasts";
import logoImage from './../../assets/Google Tasks.svg'

export const Register = () => {
  /**
   * [loading] - Defines if the request is being processed
   * [callEndpoint] - Method that make the request
   */
  const { loading, callEndpoint } = useFetchAndLoad();

  /**
   * [useForm]
   * Form that stores the user values
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Register>();

  /**
   * [navigate]
   * Navigation function
   */
  const navigate = useNavigate();

  /**
   * [registerUser]
   * @param data User credentials
   */
  const registerUser = async (data: Register) => {
    const { username, email, password } = data;
    try {
      const response: any = await callEndpoint(
        RegisterUserService({
          username,
          email,
          password,
        })
      );
      successToast(response.msg);
      navigate("/");
    } catch (error: any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen gap-10 py-10">
      <div className="m-auto min-h-screen flex flex-col gap-4 justify-center w-full max-w-screen-md">
        <img
          src={logoImage}
          width="200"
          height="200"
          className="text-center mx-auto max-w-md"
          alt="register image"
        />
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-4xl">
            Hi, Welcome to <span className="text-primary">TASKAPP</span>
          </h2>
          <span className="text-md text-gray-400">
            Start to control you tasks
          </span>
        </div>
        <form
          onSubmit={handleSubmit(registerUser)}
          className="bg-white p-8 flex flex-col gap-2 box-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <InputComponent
              labelText="Email"
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
              labelText="Username"
              id="username"
              type="text"
              placeholder="Username"
              register={register}
              hasError={errors.username}
              validationSchema={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                minLength: {
                  value: 3,
                  message: "Please enter a minimum of 3 characters",
                },
              }}
              errors={errors}
            />

            <InputComponent
              labelText="Password"
              id="password"
              type="password"
              placeholder="Password"
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

            <InputComponent
              labelText="Confirm password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              hasError={errors.password}
              register={register}
              validationSchema={{
                required: {
                  value: true,
                  message: "Password confirmation is required",
                },
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              }}
              errors={errors}
            />
          </div>

          <ButtonComponent
            loading={loading}
            type="submit"
            btnText="Register"
            addtionalStyles="mt-4 p-4"
            styleType="primary"
          />

          <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-400 font-normal gap-4">
            <Link className="ml-auto text-[15px]" to="/">
              Already have an account?{" "}
              <span className="text-primary underline">Log In</span>
            </Link>
          </nav>
        </form>
      </div>
    </div>
  );
};
