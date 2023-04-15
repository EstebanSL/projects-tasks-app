import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../../utilities/axiosClient';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { Alert } from '../../components';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const { setAuth } = useContext<any>(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<any>({});

  const { msg } = alert;

  const loginUser = async (e: any) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields must be provided',
        error: true,
      });
    }

    try {
      const {data }: any = await clientAxios.post(`/users/login`, {
        email,
        password,
      });
      setAuth(data)
      localStorage.setItem('token', data.token)
    } catch (error) {
      console.log(error);
    }
  };

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

        <ButtonComponent type='submit' btnText="Log In"  />
        {msg && <Alert alert={alert}/>}
      </form>

      <nav className='flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4'>
        <Link className='hover:underline' to="/register">Don't have an account? Register here!</Link>
        <Link className='hover:underline' to="/reset-password">Forgot your password?</Link>
      </nav>
    </div>
  );
};

export default Login;
