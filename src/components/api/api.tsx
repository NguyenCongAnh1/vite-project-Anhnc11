import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface UseApiOptions{
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  initialData?: [];
}

export interface UseApiResult {
  data?: [];
  loading: boolean;
  error: AxiosError | null;
}

function useApi({ url, method, headers, initialData}: UseApiOptions): UseApiResult{
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse = await axios({
          method,
          url,
          headers,
        });

        if(response.data){
          setData(response.data);
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, headers]);

  return { data, loading, error };
}

export default useApi;