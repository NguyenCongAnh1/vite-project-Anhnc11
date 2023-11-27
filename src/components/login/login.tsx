
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useApi, { UseApiOptions, UseApiResult } from '../api/api';
import { useNavigate } from 'react-router-dom';


interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit, formState } = useForm<FormData>();
    // const [userData, setUserData] = useState();
    // const [loading, setLoading] = useState(true);
    const [errorUser, setErrorUser] = useState<string | null>(null);
    const navigate = useNavigate();
    const apiOptions: UseApiOptions = {
        url: 'http://localhost:3000',
        method: 'GET',
    }

    const { data, loading, error }: UseApiResult = useApi(apiOptions);

    const onSubmit: SubmitHandler<FormData> = async (dataForm) => {
        const {email, password } = dataForm;
        const foundUser = data?.find((obj) => obj.email == email && obj.password == password);
        if(!foundUser){
            setErrorUser("User not found");
        }else{
            navigate('/shop');
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address',
                                        }
                                    })}
                                    className="pl-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formState.errors.email && <p className='error-message'>{formState.errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                        pattern: {
                                            value: /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                                            message: 'Password must contain at least 1 special character'
                                        },
                                    })}
                                    className="pl-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formState.errors.password && <p className='error-message'>{formState.errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {error && <p className='error-message'>{error.message}</p>}
                    {errorUser && <p className='error-message'>{errorUser}</p>}                   
                </div>
            </div>
        </>
    )
}