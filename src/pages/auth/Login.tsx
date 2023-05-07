import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { InputComponent } from '../../components';
import { ButtonComponent } from '../../components';
import { useFetchAndLoad } from '../../hooks';
import { LoginUserService } from './services/Auth.service';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { errorToast } from '../../utilities/toasts';

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
      localStorage.setItem('token', response.token);
      setAuth(response);
      navigate('/projects');
    } catch (error : any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  //Template
  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <form
        onSubmit={handleSubmit(loginUser)}
        className="bg-white p-8 flex flex-col gap-2"
      >
        <h1 className="text-4xl text-center mb-6 font-bold text-black">
          Log In
        </h1>
        <InputComponent
          labelText="Email"
          id="email"
          type="text"
          placeholder="Email"
          register={register}
          additionalInputStyles={errors.email && 'border-b-red-500'}
          validationSchema={{
            required: {
              value: true,
              message: 'Email is required',
            },
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
          errors={errors}
        />

        <InputComponent
          labelText="Password"
          id="password"
          type="password"
          placeholder="Password"
          additionalContainerStyles="mt-4"
          additionalInputStyles={errors.password && 'border-b-red-500'}
          register={register}
          validationSchema={{
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Please enter a minimum of 6 characters',
            },
          }}
          errors={errors}
        />

        <ButtonComponent
          loading={loading}
          type="submit"
          btnText="Log In"
          addtionalStyles="mt-4"
        />

        <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
          <Link className="hover:underline" to="/register">
            Don't have an account? Register here!
          </Link>
          <Link className="hover:underline" to="/reset-password">
            Forgot your password?
          </Link>
        </nav>
      </form>
    </div>
  );
};
