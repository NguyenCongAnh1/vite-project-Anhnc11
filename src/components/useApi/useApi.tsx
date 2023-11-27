import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UseApiOptions<T> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    initialData?: T | null;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error?: AxiosError;
}

function useApi<T>({
    url,
    method = 'GET',
    initialData = null,
}: UseApiOptions<T>): UseApiResult<T> {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(); 

    const fetchData = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse<T> = await axios({
                method,
                url,
            });

            setData(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, method]);

    return { data, loading, error};
}

export default useApi;