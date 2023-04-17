import { useState } from 'react';
import { Link } from 'react-router-dom';
import {InputComponent} from '../../components';
import {ButtonComponent} from '../../components';
import { Alert } from '../../components';
import { forgotPasswordService } from './services/Auth.service';
import { useFetchAndLoad } from '../../hooks';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<any>({});
  const { loading, callEndpoint } = useFetchAndLoad();

  const { msg } = alert;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (email === '') {
      setAlert({
        msg: 'Email is required',
        error: true,
      });
      return;
    }

    try {
      const response = await callEndpoint(
        forgotPasswordService({
          email,
        })
      );
      console.log(response);
      setAlert({});
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <h1 className="text-4xl text-center mb-6 font-bold text-sky-800">
        Forgot password
      </h1>

      <form
        onSubmit={onSubmit}
        className="bg-white p-4 py-8 rounded-md flex flex-col gap-2"
      >
        <p className="text-center font-semibold my-4">
          We'll send you an email with the instructions to reset your password
        </p>
        <InputComponent
          labelText="Email"
          id="Email"
          type="text"
          placeholder="Write your email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <ButtonComponent
          type="submit"
          btnText="Send instructions"
          addtionalStyles="mt-4"
        />
        {msg && <Alert alert={alert} />}
      </form>
      <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
        <Link className="hover:underline sm:text-center" to="/">
          Already have an account? Log In
        </Link>
        <Link className="hover:underline  sm:text-center" to="/register">
          Don't have an account? Register here!
        </Link>
      </nav>
    </div>
  );
};
