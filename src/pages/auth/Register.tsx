import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components';
import clientAxios from '../../utilities/axiosClient';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasword] = useState('');
  const [alert, setAlert] = useState<any>({});

  const { msg } = alert;

  const registerUser = async (e: any) => {
    e.preventDefault();
    if ([email, username, password, confirmPassword].includes('')) {
      setAlert({
        msg: 'All fields must be provided',
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: 'Password must be at least 6 characters',
        error: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({
        msg: 'Password must be equal',
        error: true,
      });
      return;
    }

    try {
      const response: any = await clientAxios.post(`/users`, {
        username,
        email,
        password,
      });
      setAlert({
        msg: response.msg,
        error: false,
      });
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPasword('');
    } catch (error) {
      console.log('xd');
    }

    console.log('creating');
  };

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <h1 className="text-4xl text-center mb-6 font-bold text-sky-800">
        Register
      </h1>
      <form
        onSubmit={registerUser}
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
          labelText="Username"
          id="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />

        <InputComponent
          labelText="Password"
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <InputComponent
          labelText="Confirm password"
          id="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPasword(e.target.value)}
        />

        <ButtonComponent
          type="submit"
          btnText="Register"
        />
        {msg && <Alert alert={alert} />}
      </form>

      <nav className='flex flex-wrap justify-between max-sm:flex-col max-sm:text-center mt-4 text-gray-600 font-normal gap-4'>
        <Link className='hover:underline sm:text-center' to="/" >Already have an account? Log In</Link>
        <Link className='hover:underline  sm:text-center' to="/reset-password">Forgot your password?</Link>
      </nav>
    </div>
  );
};

export default Register;
