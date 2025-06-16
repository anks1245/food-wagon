import { FormEvent } from "react";
// import { ReactFormState } from "react-dom/client";
// import { NavLink } from "react-router";

interface LocationModalProps{
    isShown: boolean,
    close: () => void
}

const LocationModal = ({isShown, close}: LocationModalProps) => {
    // const [location, setLocation] = useState("");

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        close();
    }

    const handleChangeCity = () => {

    }

    return (
        <>
            <div className={`relative ${isShown?'z-10':'-z-99'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={close}>
                <div className={`fixed inset-0 bg-gray-500/75 transition-all transition-opacity ${isShown?"ease-in duration-200 opacity-100":"ease-out duration-100 opacity-0"}`} aria-hidden="true"></div>

                <div className={`fixed inset-0 z-10 w-screen overflow-y-auto ${isShown?"ease-out duration-300 opacity-100 translate-y-0 sm:scale-100":"ease-in duration-50 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}`}>
                    <div className="flex min-h-full items-end md:items-center justify-center p-4 text-center sm:p-0">
                        <div className="relative w-full sm:w-2xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-10" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-xl ">Search Location</h2>
                            <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={close}>
                                <span className="sr-only">Close</span>
                                &times;
                            </button>
                            <div className="flex flex-row justify-center my-2 gap-4">
                                <input type="text" name="location" placeholder="Enter your area/pincode" className="flex-grow-1 px-2 border-b-1 border-gray-300 focus:border-(--color-primary) outline-none" onChange={handleSubmit}/>
                                <button className="btn-grad text-white"><i className="fa-solid fa-magnifying-glass"></i> Search </button>
                            </div>

                            <ul role="list" className="divide-y divide-gray-100">
                                <li className="flex gap-x-6 py-5 items-center text-(--color-primary) cursor-pointer" onClick={()=>{}}>
                                    <i className="fa-solid fa-location-crosshairs"></i>
                                    <span className="font-semibold">Detect your location</span>
                                </li>
                                <li className="flex justify-between gap-x-6 py-5" onClick={handleChangeCity}>
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm/6 font-semibold text-gray-900">Bhubaneswar</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="mt-1 text-xs/5 text-gray-500">{}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="fixed z-20 top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between w-64">
                <span>Success! Action completed.</span>
                <button className="ml-2 text-white font-bold" >×</button>
            </div> */}
        </>
    )
}

export default LocationModal;