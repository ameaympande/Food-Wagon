import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetRestaurantsAPI } from "../../apicalls/GetRestaurantsAPI";

const OrderPopUp = ({ showModal, setShowModal, itemName }) => {
    const profile = useSelector((state) => state.profile)
    const [form, setForm] = useState({
        email: profile.email,
        items: [],
        restaurantId: "",
        customerId: profile.userId
    });
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showModal) {
            handleRestaurantData();
        }
    }, [showModal]);

    const handleRestaurantData = async () => {
        try {
            setLoading(true);
            const response = await GetRestaurantsAPI();
            if (Array.isArray(response.data)) {
                setRestaurantData(response.data);
            } else {
                setRestaurantData([response.data]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setLoading(false);
        }
    }


    return (
        <>
            <button
                className="bg-white text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(!showModal)}
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
                                                <X />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <form className="bg-gray-200  pb-8">
                                            <label className="block text-black text-sm font-bold mb-1">
                                                Email
                                            </label>
                                            <input
                                                disabled={true}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                value={form.email}
                                            />
                                            <label className="mt-2 block text-black text-sm font-bold mb-1">
                                                Selected Item
                                            </label>
                                            <input
                                                disabled={true}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                value={itemName}
                                            />
                                            <label className="mt-2 block text-black text-sm font-bold mb-1">
                                                Restaurant Name
                                            </label>
                                            <select className="w-full p-1">
                                                {loading ? (
                                                    <option>Loading....</option>
                                                ) : (
                                                    restaurantData.map((res, index) => (
                                                        <option key={index} value={res.name}>{res.name}</option>
                                                    ))
                                                )}
                                            </select>

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
