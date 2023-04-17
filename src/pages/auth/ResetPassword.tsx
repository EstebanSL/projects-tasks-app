import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useFetchAndLoad} from '../../hooks';
import { resetPasswordService, verifyTokenService } from './services';
import { Alert, ButtonComponent, InputComponent } from '../../components';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [validtoken, setValidToken] = useState<any>(false);
  const [alert, setAlert] = useState<any>({});
  const [alertToken, setAlertToken] = useState<any>({});
  const [modifiedPassword, setModifiedPassword] = useState<any>(false);

  const { loading, callEndpoint } = useFetchAndLoad();

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
      await callEndpoint(resetPasswordService(token, { password }));
      setModifiedPassword(true);
      setAlert({});
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await callEndpoint(verifyTokenService(token));
      setValidToken(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

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
            <InputComponent
              labelText="Password"
              id="Password"
              type="password"
              placeholder="Write your new password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <ButtonComponent
              type="submit"
              btnText="Reset Password"
              addtionalStyles="mt-4"
            />
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
