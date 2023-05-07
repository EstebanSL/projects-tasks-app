import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(true);

  const callEndpoint = async (axiosCall: any) => {
    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall;
      setLoading(false);
    return result?.data;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
  };

  const cancelEndpoint = () => {
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint };
};
