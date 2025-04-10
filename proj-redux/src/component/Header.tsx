import { AnchorHTMLAttributes, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import "./css/Style.css";
import LoginComponent, { LoginResponse } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import LogoutAlert from "./LogoutAlert";
import LocationModal from "./LocationModal";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggingIn, setLoggingIn] = useState(false);
    const [isLocation, setLocation] = useState(false);
    const [isLoggingOut, setLoggingOut] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const cartItems = useSelector((state: RootState)=> state.cart.values)
    const userAuth = useSelector((state: RootState)=>state.auth.value)
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    // console.log(cartItems);
    useEffect(()=>{
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[isProfileMenuOpen])
    
    return (
        <>
            <header className="bg-white sticky top-0 z-9 shadow-lg">
                <nav className="lg:container mx-auto flex max-w-7x1 item-center justify-between items-center p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="/logo.png" alt=""/>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" 
                        onClick={() => {
                                setMobileMenuOpen(true)
                            }
                        }>
                            <span className="sr-only">Open main menu</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-13 w-auto" onClick={()=>setLocation(true)}>
                        <div className="flex flex-wrap item-center justify-center cursor-pointer">
                            <div className="flex item-center justify-center"><b>Deliver to:</b><img className="h-5 w-4 mx-2" src="/map-marker-alt.png" alt="map-icon"/>Current Location</div>&nbsp;
                            <div>Dhaka, Bangladesh</div>
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <NavLink to="/menu" className="relative mx-3 transition duration-100 ease-in-out hover:text-amber-500 flex items-center" style={{cursor:"pointer"}}>
                            <i className="fa-solid fa-utensils"></i>&nbsp; Explore Menu
                        </NavLink>
                        <NavLink to="/cart" className="relative mx-6 transition duration-300 ease-in-out hover:scale-125 flex items-center" style={{cursor:"pointer"}}>
                            <img className="h-6 w-6" src="/cart.png" alt="Cart"/>
                            {cartItems.length>0?<span className="absolute top-0 right-0 h-4 min-w-4 bg-red-700 text-[10px] text-white font-bold" style={{ borderRadius:"50%", textAlign:"center", padding:"1px 0px"}}>{cartItems.length}</span>:<></>}
                        </NavLink>
                        {userAuth==null?(
                            <div className="text-sm/6 font-semibold text-gray-900 cursor-pointer flex" onClick={()=>{
                                    setLoggingIn(true)
                                    console.log("click");
                                }}>Log in <span aria-hidden="true">&rarr;</span>
                            </div>
                        ):(
                        <div className="relative">
                            <a ref={buttonRef} className="text-sm/6 font-semibold text-gray-900 cursor-pointer flex flex-row items-center" onClick={(e)=>{
                                e.stopPropagation();
                                setProfileMenuOpen(!isProfileMenuOpen)
                            // dispatch(logout())
                            }}>
                                <img className="h-7 w-7" src="https://avatar.iran.liara.run/public" alt="avatar"/>
                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            <div ref={menuRef} className={`absolute left-1/2 mt-8 flex w-screen max-w-max -translate-x-1/2 px-4 transition-all duration-300 ${isProfileMenuOpen?"opacity-100 z-10":"h-0 opacity-0"}`}>
                                <div className="w-50 max-md flex-auto overflow-hidden rounded-lg bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
                                    <div className="p-4">
                                        <ul>
                                            <li className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                <NavLink to={`/my-address`}><i className="fa-solid fa-map-location-dot"></i>&nbsp; My Address</NavLink>
                                            </li>
                                            <li className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                <NavLink to={`/my-orders`}><i className="fa-solid fa-boxes-packing"></i>&nbsp; My Orders</NavLink>
                                            </li>
                                            <li className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                <NavLink to={`/favorites`}><i className="fa-solid fa-heart"></i>&nbsp; Favorites</NavLink>
                                            </li>
                                            <li className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                <NavLink to={`/rewards`}><i className="fa-solid fa-trophy"></i>&nbsp; Rewards</NavLink>
                                            </li>
                                            <li className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 text-red-600">
                                                <a className="cursor-pointer" onClick={()=>{
                                                    setLoggingOut(true)
                                                }}><i className="fa-solid fa-right-from-bracket"></i>&nbsp; Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </nav>
                <div className="lg:hidden hide" id="mobile-menu" role="dialog" aria-modal="true">
                    {
                        mobileMenuOpen?<div className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"></div>:<></>
                    }
                    <div className={`fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-white px-6 py-6 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="/logo-only.png" alt=""/>
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={()=>setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/"} onClick={()=>setMobileMenuOpen(false)} end>Home</NavLink>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/menu"} onClick={()=>setMobileMenuOpen(false)}>Menu</NavLink>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/cart"} onClick={()=>setMobileMenuOpen(false)} end>Cart {cartItems.length > 0? `| ${cartItems.length} items`:""}</NavLink>
                        </div>
                        {userAuth?(<div>
                            <hr className="border-t border-gray-300 my-4 w-full"/>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/my-address"} onClick={()=>setMobileMenuOpen(false)} end>My Address</NavLink>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/my-orders"} onClick={()=>setMobileMenuOpen(false)}>My Orders</NavLink>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/favorites"} onClick={()=>setMobileMenuOpen(false)} end>Favorites</NavLink>
                            <NavLink className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to={"/rewards"} onClick={()=>setMobileMenuOpen(false)}>Rewards</NavLink>
                        </div>):<></>}
                        <hr className="border-t border-gray-300 my-4 w-full"/>
                        <div className="my-4">
                            {userAuth == null ? <a className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer" onClick={()=>{
                                setMobileMenuOpen(false)
                                setLoggingIn(true)
                            }}>Log in</a>:<a className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer text-red-600" onClick={()=>{
                                setMobileMenuOpen(false)
                                setLoggingOut(true)
                            }}>Log out</a>}
                        </div>
                    </div>
                </div>
            </header>

            <LoginComponent isShown={isLoggingIn} destroy={ function (){
                setLoggingIn(false)
            }} />

            <LogoutAlert isShown={isLoggingOut} destroy={ function(){
                setLoggingOut(false)
            }}/>
        
            <LocationModal isShown={isLocation} close={ function (){
                setLocation(false)
            }} />
        </>
    )
}

export default Header;