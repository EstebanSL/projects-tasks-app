import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ConfirmAccount = () => {
  const params: any = useParams<any>();
  const { token } = params;

  console.log(token);

  const confirmAccount = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/users/confirm/${token}`;
      console.log(url);
      const { data } = await axios(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    confirmAccount();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <h1 className="text-4xl text-center mb-6 font-bold text-sky-800">
        Confirm account
      </h1>
      <div className="bg-white p-4 py-8 rounded-md flex flex-col gap-2">
        <h1 className="text-center">Your account has been verified successfully, login <Link to='/' className='underline font-bold text-sky-600'>here</Link></h1>
      </div>
    </div>
  );
};

export default ConfirmAccount;
