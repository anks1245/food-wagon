import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"

type LoginModalProps = {
    isShown: Boolean,
    destroy: () => void
}

export type LoginResponse = {
    status: Boolean,
    message: String
}

const LoginComponent = ({isShown, destroy}: LoginModalProps) => {
    const [isOtpSent, setOtpSent] = useState(false);
    const [mobileNo, setMobileNo] = useState("");
    const [otp, setOtp] = useState("");
    // const [isLogIn, setLogIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        setOtpSent(false);
        return () => {setOtpSent(false)}
    },[])

    const validateNumber = (e: ChangeEvent<HTMLInputElement>):string => {
        // console.log(e.);
        return e.target.value.replace(/[^0-9]/g, ""); 
        // setMobileNo(value);
    }

    const handleSendOtp = (e: FormEvent) => {
        setErrorMsg("")
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const inputValue = formData.get("mobile") as string;
        console.log(inputValue);
        setOtpSent(true)
    }

    const handleVerifyOtp = (e: FormEvent) => {
        setErrorMsg("")
        e.preventDefault();
        if (otp != "1234") {
            setErrorMsg("Invalid OTP")
            return
        }
        dispatch(login({
            mobile: mobileNo,
            token: "abc",
            status: "Logged in"
        }))
        setMobileNo("");
        setOtp("");
        setOtpSent(false);
        // setLogIn(true)
        destroy()
    }

    return (
        <>
            <div className={`relative ${isShown?'z-10':'-z-99'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={destroy}>
                <div className={`fixed inset-0 bg-gray-500/75 transition-all transition-opacity ${isShown?"ease-in duration-200 opacity-100":"ease-out duration-100 opacity-0"}`} aria-hidden="true"></div>

                <div className={`fixed inset-0 z-10 w-screen overflow-y-auto ${isShown?"ease-out duration-300 opacity-100 translate-y-0 sm:scale-100":"ease-in duration-50 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}`}>
                    <div className="flex min-h-full items-end md:items-center justify-center p-4 text-center sm:p-0">
                        <div className="relative w-full sm:w-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={destroy}>
                                <span className="sr-only">Close</span>
                                &times;
                            </button>
                            <div className="bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="hidden md:block lg:block">
                                        <img className="h-140" src="./login-banner.jpg" alt="login banner"/>
                                    </div>
                                    <div className="h-auto md:h-140 p-10 bg-white flex flex-col justify-center">
                                        {!isOtpSent && <>
                                            <h2 className="text-[38px] font-semibold my-2">Login</h2>
                                            <div className="mt-2 mb-4">
                                                <h4 className="font-bold">Enter your mobile number to continue</h4>
                                                <span className="text-wrap">We'll send you a one-time password<br/> (OTP) for verification.</span>
                                            </div>
                                            <form onSubmit={handleSendOtp}>
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Mobile No.</label>
                                                    <div className="mt-1">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">+91 </div>
                                                        <input type="tel" maxLength={10} name="mobile" id="mobile" pattern="[0-9]*" inputMode="numeric" onChange={(e)=>{
                                                            let num = validateNumber(e)
                                                            setMobileNo(num);
                                                        }} value={mobileNo} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Enter your phone no." required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-grad w-full text-white my-4">Login</button>
                                            </form>
                                            
                                            <center>OR</center>
                                            <h3>Google Login</h3>
                                        </>}
                                        {isOtpSent && <>
                                            <h2 className="text-[38px] font-semibold my-2">Verify OTP</h2>
                                            <div className="mt-2 mb-4 max-w-70">
                                                <p className="text-wrap ">We've sent a 4-digit OTP to your mobile number +91 XXXXXXXX. If this is not your number, <span className="cursor-pointer text-(--color-primary)" onClick={()=>{
                                                    setOtp("");
                                                    setOtpSent(false);
                                                }}>click here to change.</span></p>
                                            </div>
                                            <form onSubmit={handleVerifyOtp}>
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="otp" className="block text-sm/6 font-medium text-gray-900">Enter OTP</label>
                                                    <div className="mt-1">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                        {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">+91 </div> */}
                                                        <input type="text" maxLength={4} name="otp" id="otp" onChange={(e)=>{
                                                            let num = validateNumber(e)
                                                            setOtp(num);
                                                        }} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Enter 4 digit OTP" required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn-grad w-full text-white my-4">Verify Otp</button>
                                            </form>
                                            <p className="text-center text-(--md-sys-color-error) h-10">{errorMsg}</p>
                                            
                                            Didn't receive an OTP? Resend OTP
                                        </>}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div> */}
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

export default LoginComponent;