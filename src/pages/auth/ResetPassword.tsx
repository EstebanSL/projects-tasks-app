import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { resetPasswordService, verifyTokenService } from './services';
import { Alert, ButtonComponent, InputComponent } from '../../components';
import { errorToast, successToast } from '../../utilities/toasts';
import { useForm } from 'react-hook-form';

interface ResetPass {
  password: string
}

export const ResetPassword = () => {
  /**
   * [validToken]
   * Stores if the url token is valid
   */
  const [validtoken, setValidToken] = useState<boolean>(false);

  const [alertToken, setAlertToken] = useState<any>({});

  /**
   * [modifiedPassword]
   * Stores if the new password has been send
   */
  const [modifiedPassword, setModifiedPassword] = useState<boolean>(false);

  /**
   * [useForm]
   * Form that stores the user values
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPass>();

  /**
   * [loading] - Defines if the request is being processed
   * [callEndpoint] - Method that make the request
   */
  const { loading, callEndpoint } = useFetchAndLoad();

    /**
   * [params]
   * URL params object
   */
  const params: any = useParams<any>();
  const { token } = params;

  /**
   * [onSubmit]
   * Method that sends the new password to save
   * @param {ResetPass} data 
   */
  const onSubmit = async (data: ResetPass) => {
    const { password } = data;

    try {
      await callEndpoint(resetPasswordService(token, { password }));
      setModifiedPassword(true);
      successToast('Password changed successfully, continue to login');
    } catch (error: any) {
      successToast(error.response.data.msg);
      console.log(error);
    }
  };

  /**
   * [verifyToken]
   * Method that validate the url token
   */
  const verifyToken = async () => {
    try {
      const response = await callEndpoint(verifyTokenService(token));
      setValidToken(response);
    } catch (error: any) {
      errorToast(error.response.data.msg);
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center w-full max-w-screen-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 py-8 flex flex-col gap-2"
      >
        <h1 className="text-4xl text-center mb-6 font-bold text-black">
          Reset password
        </h1>
        {validtoken && (
          <>
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

            <ButtonComponent
              loading={loading}
              type="submit"
              btnText="Reset Password"
              addtionalStyles="mt-4"
            />
          </>
        )}
        {!validtoken && (
          <p className="text-center">
            This password recovery email is not valid anymore
          </p>
        )}
        {alertToken.msg && <Alert alert={alertToken} />}
        {modifiedPassword && (
          <Link className="mx-auto my-4 text-gray-600 hover:underline" to="/">
            Log In
          </Link>
        )}
      </form>
    </div>
  );
};
