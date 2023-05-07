import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ValidateAccountService } from './services/Auth.service';
import { useFetchAndLoad } from '../../hooks';

export const ConfirmAccount = () => {
  const params: any = useParams<any>();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { token } = params;

  const confirmAccount = async () => {
    try {
      await callEndpoint(ValidateAccountService(token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    confirmAccount();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <div className="bg-white rounded-xl p-4 py-8 flex flex-col gap-2">
        <h1 className="text-4xl text-center mb-6 font-bold text-sky-900">
          ACCOUNT CONFIRMATION
        </h1>
        <p className="text-center">
          Your account has been verified successfully, login{' '}
          <Link to="/" className="underline font-bold text-sky-600">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};
