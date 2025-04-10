import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addOneQuantity, remove, removeOneQuantity } from "../features/cart/cartSlice";
import { Product } from "../types/Product";
import LoginComponent from "../component/Login";



const Cart = () => {
    const cartItems = useSelector((state: RootState)=>state.cart.values)
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const userAuth = useSelector((state: RootState)=>state.auth.value)
    const [isLoggingIn, setLoggingIn] = useState(false);
    const handleQuantity = (product: Product, type:"+"|"-") => {
        if(type == "+"){
            dispatch(addOneQuantity(product))
        }else{
            if (product.quatity == 1) {
                dispatch(remove(product));
                return
            }
            dispatch(removeOneQuantity(product))
        }
    }

    useEffect(()=>{
        let price = 0
        for (let index = 0; index < cartItems.length; index++) {
            if(cartItems[index].offeredPrice!=null){
                price += cartItems[index].offeredPrice! * cartItems[index].quatity 
            }else{
                price += cartItems[index].price * cartItems[index].quatity 
            }
        }
        setTotalPrice(price)
    },[cartItems])

    const handleCheckout = () => {
        if(userAuth == null){
            setLoggingIn(true)
            return
        }
        //process payment
        console.log("hiii");
    }
    

    return (
        <>
            <div className="flex flex-row justify-center min-h-100">
                <div className="container p-5 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-1 lg:col-span-2">
                            <div className="card min-h-100 bg-white rounded-xl p-5">
                                <h5 className="text-[20px] font-semibold">My Cart</h5>
                                <div className="cart-items">
                                    {cartItems.length != 0 ? (
                                        cartItems.map(item=>(
                                            <div className="p-2 my-2 border-1 rounded-sm border-gray-300">
                                                <div className="flex flex-row">
                                                    <img className="h-32 w-32 rounded-md" src={`${item.foodImage}`} />
                                                    <div className="mx-3 my-2 flex flex-col md:flex-row justify-between flex-grow-1">
                                                        <div>
                                                            <h6 className="font-semibold">{item.foodName}</h6>
                                                            <p className="text-(--color-gray-700) text-[12px]">by {item.restaurantName}</p>
                                                            <h4 className={` ${item.offeredPrice!=null?"line-through text-(--color-gray-500) text-[16px]":"text-[24px]"}`}>{`${item.currency} ${item.price} `} </h4>
                                                            <h4 className={`text-[24px] font-semibold ${item.offeredPrice!=null?"opacity-100":"opacity-0"}`}>{`${item.currency} ${item.offeredPrice}`}</h4>
                                                        </div>
                                                        <div className="flex flex-row">
                                                            <button className="btn-grad h-8 w-8 rounded-full text-center text-white" style={{padding:0}} onClick={()=>handleQuantity(item,"-")}>-</button>
                                                            <span className="m-1 px-2">{item.quatity}</span>
                                                            <button className="btn-grad h-8 w-8 rounded-full text-center text-white" style={{padding:0}} onClick={()=>handleQuantity(item,"+")}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="border-t border-gray-300 my-2 w-full"/>
                                                    <div className="text-(--color-gray-700)">
                                                        No offer available
                                                    </div>
                                            </div>
                                        ))):(
                                            <div className="flex flex-col justify-center items-center min-h-100">
                                                <img src="/food-vector.svg" className="h-50 w-50" alt="no food"/>
                                                <h4 className="text-xl m-2">No food items found</h4>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card lg:col-span-1 rounded-xl">
                            <div className="card min-h-50 bg-white rounded-xl sticky top-25 p-5">
                                <h5 className="text-[20px] font-semibold">Checkout</h5>
                                {cartItems.map(item=>(
                                    <div className="flex flex-row justify-between items-center my-3">
                                        <div>
                                            <span>{item.foodName}</span>
                                            <p className="text-xs text-gray-500">{`x${item.quatity}`}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p>{`${item.currency} ${((item.offeredPrice!=null?item.offeredPrice:item.price)*item.quatity)}`}</p>
                                        </div>
                                    </div>
                                ))}
                                <hr className="border-t border-gray-300 my-2 w-full"/>
                                <div className="flex flex-row justify-between items-center my-3">
                                    <h5>Total</h5>
                                    <div className="text-lg font-semibold">
                                        <p>{`$ ${totalPrice}`}</p>
                                    </div>
                                </div>
                                <button className={`btn-grad w-full text-white mt-4 ${(userAuth!=null && cartItems.length == 0)?"opacity-70":"opacity-100"}`} disabled={ userAuth!=null && cartItems.length == 0} onClick={handleCheckout}>{userAuth!=null?"Proceed to checkout":"Login to continue"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginComponent isShown={isLoggingIn} destroy={ function (){
                setLoggingIn(false)
            }} />
        </>
        
    )
}

export default Cart;