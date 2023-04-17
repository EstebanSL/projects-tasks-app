import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {InputComponent} from '../../components';
import {ButtonComponent} from '../../components';
import { Alert } from '../../components';
import {useFetchAndLoad} from '../../hooks';
import { LoginUserService } from './services/Auth.service';

export const Login = () => {

  //Variables definition
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<any>({});

  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();


  const { msg } = alert;

  //Functions definition
  const loginUser = async (e: any) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields must be provided',
        error: true,
      });
      return
    }
    
    try {
      const response = await callEndpoint(
        LoginUserService({ email, password })
      );
      localStorage.setItem('token', response.token);
      setAuth(response);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  //Template
  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <h1 className="text-4xl text-center mb-6 font-bold text-sky-800">
        Log In
      </h1>
      <form
        onSubmit={loginUser}
        className="bg-white p-4 py-8 rounded-md flex flex-col gap-2"
      >
        <InputComponent
          labelText="Email"
          id="Email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <InputComponent
          labelText="Password"
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <ButtonComponent
          type="submit"
          btnText="Log In"
          addtionalStyles="mt-4"
        />
        {msg && <Alert alert={alert} />}
      </form>

      <nav className="flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4">
        <Link className="hover:underline" to="/register">
          Don't have an account? Register here!
        </Link>
        <Link className="hover:underline" to="/reset-password">
          Forgot your password?
        </Link>
      </nav>
    </div>
  );
};