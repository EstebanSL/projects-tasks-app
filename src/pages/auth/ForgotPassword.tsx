import { Link } from 'react-router-dom';
import { InputComponent } from '../../components';
import { ButtonComponent } from '../../components';
import { forgotPasswordService } from './services/Auth.service';
import { useFetchAndLoad } from '../../hooks';
import { useForm } from 'react-hook-form';
import { errorToast, successToast } from '../../utilities/toasts';

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
      successToast('Recovery password sent successfully')
    } catch (error: any) {
      errorToast(error.response.data.msg)
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 py-8 flex flex-col gap-2"
      >
          <h1 className="text-4xl text-center mb-6 font-bold text-slate-900">
            FORGOT PASSWORD
          </h1>
        <p className="text-center font-semibold text-slate-900 my-4">
          We'll send you an email with the instructions to reset your password
        </p>
        <InputComponent
          labelText="Email"
          id="email"
          type="text"
          placeholder="Email"
          register={register}
          additionalInputStyles={errors.email && 'border-b-red-300'}
          validationSchema={{
            required: {
              value: true,
              message: 'Email is required',
            },
            minLength: {
              value: 6,
              message: 'Please enter a minimum of 6 characters',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
          errors={errors}
        />

        <ButtonComponent
          loading={loading}
          type="submit"
          btnText="Send instructions"
          addtionalStyles="mt-4"
          styleType='primary'
        />
        <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
          <Link className="hover:underline sm:text-center" to="/">
            Already have an account? Log In
          </Link>
          <Link className="hover:underline  sm:text-center" to="/register">
            Don't have an account? Register here!
          </Link>
        </nav>
      </form>
    </div>
  );
};
