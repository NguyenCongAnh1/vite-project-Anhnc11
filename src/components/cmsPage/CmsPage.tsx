import React, { useContext, useState } from "react"
import './CmsPage.css'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useApi, { UseApiOptions, UseApiResult } from "../api/api";
import { useNavigate } from "react-router-dom";
import DataContext from "../../store/Context";

interface FormProduct {
  productId: number;
  file: string;
  quantity: 0;
  name: string;
  price: number;
}

const CmsPage: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormProduct>();
  const [productId, setProductIdInForm] = useState(1);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const dataProduct = useContext(DataContext);
  const onSubmit: SubmitHandler<FormProduct> = async (dataForm) => {
    const { name, price, quantity, file } = dataForm;

    const reqForm: FormProduct = {
      productId: dataProduct!.length + 1,
      file: file[0],
      quantity: 0,
      name: name,
      price: price
    }
    try {

      setLoadingButton(true);
      const response = await axios.post('http://localhost:3000/image', reqForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Tăng giá trị productId sau khi sản phẩm được thêm
      setProductIdInForm((productId) => productId + 1);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setTimeout(async () => {
        setLoadingButton(false);
        // Đợi một tick để đảm bảo setLoadingButton đã hoàn thành
        setTimeout(async () => {
          navigate('/shop');
        }, 100)
      }, 2000);
    }
  };

  return (
    <div style={{ margin: '30px 300px' }}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Name of item
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      {...register('name', {
                        required: 'Name is required'
                      })}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Orange"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    {...register('about')}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about item.</p>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          {...register('file', {
                            required: 'File is required'
                          })}
                          id="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Item Information</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    {...register('price', {
                      required: 'Price is required'
                    })}
                    autoComplete="given-name"
                    placeholder=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loadingButton}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loadingButton ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>

  )
}
export default CmsPage;