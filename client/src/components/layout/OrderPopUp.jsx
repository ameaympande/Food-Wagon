import React, { useState } from "react";

const OrderPopUp = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="bg-white text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
            </button>
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 overflow-hidden"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="relative w-full max-w-md">
                                <div
                                    className="bg-bg-hover-primary rounded-lg shadow-lg"

                                >
                                    <div className="flex items-start justify-between p-10 border-b border-solid border-gray-300 rounded-t">
                                        <div className="text-text-red text-4xl md:text-md font-extrabold text-center">
                                            <p>Place Your Order</p>
                                        </div>
                                        <button
                                            className="text-black"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="text-black opacity-7 h-6 w-6 text-3xl block bg-gray-400 py-0 rounded-full ">
                                                x
                                            </span>
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <form className="bg-gray-200  pb-8">
                                            <label className="block text-black text-sm font-bold mb-1">
                                                First Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                            />
                                            {/* ... other form fields */}
                                        </form>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default OrderPopUp;
