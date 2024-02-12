import { Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetRestaurantsAPI } from "../../apicalls/GetRestaurantAPI";
import { setAddress } from "../../redux/features/profile/profileSlice";
import { PlaceOrderAPI } from "../../apicalls/PlaceOrderAPI";

const OrderPopUp = ({ showModal, setShowModal, item }) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile)
    const [form, setForm] = useState({
        email: profile.email,
        items: [{ MenuItemId: item._id, quantity: 1 }],
        selectedItem: "",
        restaurantId: "",
        customerId: profile.userId,
        address: profile ? profile?.address : ""
    });
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([])
    useEffect(() => {
        if (showModal) {
            handleRestaurantData();
        }
    }, [showModal]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...form };

        if (name === "selectedItem") {
            const selectedRestaurant = restaurantData.find(item => item.name === value);
            if (selectedRestaurant) {
                updatedForm = {
                    ...updatedForm,
                    restaurantId: selectedRestaurant._id
                };
            }
        }

        if (name === "quantity") {
            const index = parseInt(e.target.dataset.index);
            const quantityValue = parseInt(value);
            updatedForm.items[index].quantity = Math.max(1, quantityValue);
        }

        updatedForm = {
            ...updatedForm,
            [name]: value
        };

        setForm(updatedForm);

        if (name === "address") {
            dispatch(setAddress(value));
        }
    }


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

    const handleSubmit = async () => {

        const errors = {};

        try {
            if (!form.selectedItem) {
                errors.selectedItem = "Please select a restaurant.";
            }
            if (!form.address) {
                errors.address = "Please provide your address.";
            }

            if (Object.keys(errors).length > 0) {
                setError(errors);
                return;
            }

            setError([]);

            console.log("Form submitted successfully:", form);
            const res = await PlaceOrderAPI(form);
            console.log(res);

        } catch (error) {
            console.log(error);
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
                <div className="fixed inset-0 z-50 overflow-hidden" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="relative w-full max-w-md">
                            <div className="bg-bg-hover-primary rounded-lg shadow-lg overflow-y-auto max-h-screen">
                                <div className="flex items-start justify-between p-10 border-b border-solid border-gray-300 rounded-t">
                                    <div className="text-text-red text-4xl md:text-md font-extrabold text-center">
                                        <p>Place Your Order</p>
                                    </div>
                                    <button className="text-black" onClick={() => setShowModal(false)}>
                                        <span className="text-black opacity-7 h-6 w-6 text-3xl block bg-gray-400 py-0 rounded-full ">
                                            <X />
                                        </span>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <form className="bg-gray-200 pb-8">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Email
                                        </label>
                                        <input disabled={true} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" value={form.email} />
                                        <label className="mt-2 block text-black text-sm font-bold mb-1">
                                            Selected Item
                                        </label>
                                        <input disabled={true} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" value={item.name} />
                                        <label className="mt-2 block text-black text-sm font-bold mb-1">
                                            Restaurant Name
                                        </label>
                                        <select name="selectedItem" className="w-full p-1" onChange={handleOnChange} value={form.selectedItem}>
                                            {loading ? (
                                                <option>Loading....</option>
                                            ) : (
                                                restaurantData.map((res, index) => (
                                                    <option key={index} value={res.name}>{res.name}</option>
                                                ))
                                            )}
                                        </select>
                                        {error.selectedItem && <p className="text-text-red">{error.selectedItem}</p>}
                                        <label className="mt-2 block text-black text-sm font-bold mb-1">
                                            Address
                                        </label>
                                        <input name="address" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" value={form.address} onChange={handleOnChange} />
                                        {error.address && <p className="text-text-red">{error.address}</p>}
                                        {form.items.map((item, index) => (
                                            <div key={index}>
                                                <label className="mt-2 block text-black text-sm font-bold mb-1">
                                                    Quantity
                                                </label>
                                                <input name="quantity" type="number" min="1" data-index={index} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" value={item.quantity} onChange={handleOnChange} />
                                            </div>
                                        ))}
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button className="text-primary bg-text-red background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-4 mb-1 rounded-lg hover:bg-red-200" type="button" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                    <button className="text-primary bg-text-green active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded-lg hover:shadow-lg focus:outline-none mr-1 mb-1" type="button" onClick={handleSubmit}>
                                        <Check size={24} className="" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default OrderPopUp;
