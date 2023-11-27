import React from "react";
import './checkOut.css'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Product } from "../../App";



interface ReceiptInfo {
    cashReceived: number;
    cashReturned: number;
}

export interface CheckOutItemProps {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const CheckOut: React.FC<CheckOutItemProps> = ({ cart, setCart, open, setOpen }) => {
    const [currencySymbol] = useState("$");
    const [cashReceived, setCashReceived] = useState("");
    const [receipt, setReceipt] = useState<ReceiptInfo>();

    const cartTotal = () => {
        return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        //reduce: duyệt các phần tử của mảng thực hiện tính toán và trả về giá trị duy nhất(sum)
    };


    // <button className="submit-button" onClick={submitCash}>SUBMIT</button>
    // {
    //     receipt && (
    //         <>
    //             <h3>Receipt</h3>
    //             <p>Cash Received: {currencySymbol}{receipt.cashReceived}</p>
    //             <p>Cash Returned: {currencySymbol}{receipt.cashReturned}</p>
    //             <p>Thank you!</p>
    //         </>
    //     )
    // }



    const submitCash = () => {
        const cashReceivedValue = parseFloat(cashReceived);
        const cashReturned = cashReceivedValue - cartTotal();

        const receiptInfo = {
            cashReceived: cashReceivedValue,
            cashReturned: cashReturned,
        };

        setReceipt(receiptInfo);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cart.map((product) => (
                                                            <li key={product.productId} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                         src={`../../../crud-json/uploads/${product.file}`}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a>{product.name}</a>
                                                                            </h3>
                                                                            <p className="ml-4">{currencySymbol}{product.price}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">Quantity {product.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{currencySymbol}{cartTotal()}</p>
                                            </div>
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                <label htmlFor="cash-received" className="mt-0.5 text-sm text-gray-500 input-value" style={{ overflow: 'visible' }}>Cash Received:</label>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={cashReceived}
                                                    style={{ paddingLeft: '10px'}}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={(e) => setCashReceived(e.target.value)}
                                                />
                                            </div>

                                            {receipt && (
                                                <>
                                                    <p className="mt-0.5 text-base font-medium text-gray-900" >Receipt</p>
                                                    <div className="flex justify-between">
                                                        <p className="mt-0.5 text-sm text-gray-500 input-value" style={{ overflow: 'visible' }}>Cash Received</p>
                                                        <p className="font-medium text-gray-900">{currencySymbol}{receipt.cashReceived}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="mt-0.5 text-sm text-gray-500 input-value" style={{ overflow: 'visible' }}>Cash Returned</p>
                                                        <p className="font-medium text-gray-900">{currencySymbol}{receipt.cashReturned}</p>
                                                    </div>
                                                </>
                                            )}

                                            <div className="mt-6">
                                                <a
                                                    onClick={submitCash}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </a>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

}

export default CheckOut;