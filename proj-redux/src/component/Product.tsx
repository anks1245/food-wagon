import { NavLink } from "react-router"
import { Product } from "../types/Product"
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProductProps{
    product: Product,
    action: (data: Product) => void
}

export const ProductCard = ({product, action}: ProductProps) => {
    // console.log(action);
    // const [isAdded, setIsAdded] = useState(false);
    const cartItems = useSelector((state: RootState)=> state.cart.values)

    // const handleClick = () => {
    //     setIsAdded(true);
    //     setTimeout(() => setIsAdded(false), 2000); // Reset after 2s
    // };
    
    return (
        <>
            <div >
                <img src={`${product.foodImage}`} alt={`${product.foodName}`} className="min-w-40 w-100 rounded-xl"/>
                <h4 className="mt-4"><NavLink to={`#`} className="font-bold text-[16px] hover:underline">{product.foodName}</NavLink></h4>
                <NavLink to={"#"} className="text-(--color-primary) hover:underline">📍 {product.restaurantName}</NavLink>
                <p className={`${product.offeredPrice!=null?"line-through":""}`}>{`${product.currency} ${product.price} `} </p>
                <p className={`font-semibold ${product.offeredPrice!=null?"opacity-100":"opacity-0"}`}>{`${product.currency} ${product.offeredPrice}`}</p>
                <button className={`relative w-full my-2 transition-all duration-500 bg-(--color-warning) overflow-hidden`} onClick={()=>{ 
                    console.log("clicked");
                    if(cartItems.find(item => 
                        item.foodId === product.foodId && 
                        item.restaurantId === product.restaurantId)){
                        return
                    }
                    action(product);
                }}>
                    <span 
                        className={`absolute inset-0 bg-yellow-500 transition-transform duration-200 ease-linear ${
                            cartItems.find(item => 
                                item.foodId === product.foodId && 
                                item.restaurantId === product.restaurantId) ? "translate-x-0" : "-translate-x-full"
                        }`}
                    />
                    <span className="relative">
                        <i className="fa-solid fa-bag-shopping p-1"></i> 
                        {cartItems.find(item => 
                            item.foodId === product.foodId && 
                            item.restaurantId === product.restaurantId) ? "Added" : "Add to cart"}
                    </span>
                    
                    
                </button>
            </div>
        </>
    )
}