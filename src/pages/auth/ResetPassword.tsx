import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clientAxios from '../../utilities/axiosClient';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { Alert } from '../../components';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [validtoken, setValidToken] = useState(false);
  const [alert, setAlert] = useState<any>({});
  const [alertToken, setAlertToken] = useState<any>({});
  const [modifiedPassword, setModifiedPassword] = useState<any>(false);

  const params: any = useParams<any>();
  const { token } = params;
  const { msg } = alert;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password === '') {
      setAlert({
        msg: 'Password is required',
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: 'Password too short',
        error: true,
      });
      return;
    }

    try {
      await clientAxios.post(`/users/reset-password/${token}`, {
        password,
      });
      setModifiedPassword(true);
      setAlert({});
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    try {
      await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password/${token}`
      );
      setValidToken(true);
    } catch (error) {
      setAlertToken({
        msg: 'Invalid token',
        error: true,
      });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <h1 className="text-4xl text-center mb-6 font-bold text-sky-800">
        Reset password
      </h1>
      <form
        onSubmit={onSubmit}
        className="bg-white p-4 py-8 rounded-md flex flex-col gap-2"
      >
        {validtoken && (
          <>
            <p className="text-center font-semibold my-4">
              We'll send you an email with the instructions to reset your
              password
            </p>
            <InputComponent
              labelText="Password"
              id="Password"
              type="password"
              placeholder="Write your new password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <ButtonComponent type="submit" btnText="Send instructions" />
            {msg && <Alert alert={alert} />}
          </>
        )}
        {alertToken.msg && <Alert alert={alertToken} />}
      </form>

      {modifiedPassword && (
        <Link className="mx-auto my-4 text-gray-600 hover:underline" to="/">
          Log In
        </Link>
      )}
    </div>
  );
};

export default ResetPassword;
