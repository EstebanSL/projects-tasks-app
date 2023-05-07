import { Link, useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { RegisterUserService } from './services';
import { ButtonComponent, InputComponent } from '../../components';
import { useForm } from 'react-hook-form';
import { errorToast, successToast } from '../../utilities/toasts';

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
      navigate('/');
    } catch (error: any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <form
        onSubmit={handleSubmit(registerUser)}
        className="bg-white p-8 flex flex-col gap-2 box-border"
      >
        <h1 className="text-4xl text-center mb-6 font-bold text-black">
          Register
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
          labelText="Username"
          id="username"
          type="text"
          placeholder="Username"
          register={register}
          additionalContainerStyles="mt-4"
          additionalInputStyles={errors.username && 'border-b-red-500'}
          validationSchema={{
            required: {
              value: true,
              message: 'Email is required',
            },
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
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

        <InputComponent
          labelText="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          additionalContainerStyles="mt-4"
          additionalInputStyles={errors.password && 'border-b-red-500'}
          register={register}
          validationSchema={{
            required: {
              value: true,
              message: 'Password confirmation is required',
            },
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
          }}
          errors={errors}
        />

        <ButtonComponent
          loading={loading}
          type="submit"
          btnText="Register"
          addtionalStyles="mt-4"
        />

        <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
          <Link className="hover:underline sm:text-center" to="/">
            Already have an account? Log In
          </Link>
          <Link
            className="hover:underline  sm:text-center"
            to="/reset-password"
          >
            Forgot your password?
          </Link>
        </nav>
      </form>
    </div>
  );
};
