import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

interface LogoutModalProps {
    isShown: Boolean
    destroy: () => void;
}


const LogoutAlert = ({isShown,destroy}: LogoutModalProps) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        destroy();
    }

    return (
        <div className={`relative ${isShown?'z-10':'-z-99'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={destroy}>
            <div className={`fixed inset-0 bg-gray-500/75 transition-all transition-opacity ${isShown?"ease-in duration-200 opacity-100":"ease-out duration-100 opacity-0"}`} aria-hidden="true"></div>

            <div className={`fixed inset-0 z-10 w-screen overflow-y-auto ${isShown?"ease-in duration-300 opacity-100 translate-y-0 sm:scale-100":"ease-out duration-50 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative w-full sm:w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all justify-center" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={destroy}>
                            <span className="sr-only">Close</span>
                            &times;
                        </button>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">Logout</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Are you sure you want to Logout?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>handleLogout()}>Logout</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={destroy}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LogoutAlert;