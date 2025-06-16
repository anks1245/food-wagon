import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import Slider from "react-slick";
import { add } from "../features/cart/cartSlice";
// import { RootState } from "../redux/store";
import { Offer } from "../types/Offer";
import { Product } from "../types/Product";
import { Restaurant } from "../types/Restaurant";
import { Category } from "../types/Category";
import { Ads } from "../types/Ads";
import { ProductCard } from "../component/Product";
import { NotificationType, SimpleNotification } from "../component/SimpleNotification";

const Home = () => {
    const [isDelivery , setDelivery] = useState(true);
    const dispatch = useDispatch();
    const [notification, setNotification] = useState<NotificationType | null>(null);

    const OfferedItems: Offer[]= [
        {
            restaurantId: 1,
            restaurantName: "Red Foods",
            remainingDays: 1,
            discount: 15,
            imgUrl: "./images/discount1.png"
        },
        {
            restaurantId: 1,
            restaurantName: "Red Foods",
            remainingDays: 3,
            discount: 10,
            imgUrl: "./images/discount2.png"
        },
        {
            restaurantId: 1,
            restaurantName: "Greys Vage",
            remainingDays: 7,
            discount: 25,
            imgUrl: "./images/discount3.png"
        },
        {
            restaurantId: 1,
            restaurantName: "Greys Vage",
            remainingDays: 45,
            discount: 50,
            imgUrl: "./images/discount4.png"
        }
    ];

    const popularProduct:Product[] = [
        {
            foodId: 1,
            restaurantId: 1,
            foodName: "Cheese Burger",
            restaurantName: "Burger Arena",
            price: 99.00,
            offeredPrice: 79.00,
            foodImage: "./images/pi1.png",
            currency: "$",
            discount: 20,
            quatity: 1
        },
        {
            foodId: 2,
            restaurantId: 2,
            foodName: "Toffe’s Cake",
            restaurantName: "Top Sticks",
            price: 119.00,
            offeredPrice: 99.00,
            foodImage: "./images/pi2.png",
            currency: "$",
            discount: 12,
            quatity: 1
        },
        {
            foodId: 3,
            restaurantId: 3,
            foodName: "Dan Cake",
            restaurantName: "Cake world",
            price: 199.00,
            offeredPrice: null,
            foodImage: "./images/pi3.png",
            currency: "$",
            discount: null,
            quatity: 1
        },
        {
            foodId: 4,
            restaurantId: 1,
            foodName: "Chicken Burger",
            restaurantName: "Burger Arena",
            price: 199.00,
            offeredPrice: null,
            foodImage: "./images/pi1.png",
            currency: "$",
            discount: null,
            quatity: 1
        },
        {
            foodId: 5,
            restaurantId: 2,
            foodName: " Crispy Sandwick",
            restaurantName: "Burger Arena",
            price: 209.00,
            offeredPrice: null,
            foodImage: "./images/pi4.png",
            currency: "$",
            discount: null,
            quatity: 1
        },
        {
            foodId: 6,
            restaurantId: 1,
            foodName: "Chicken Soup",
            restaurantName: "Thai Soup",
            price: 99.00,
            offeredPrice: null,
            foodImage: "./images/pi5.png",
            currency: "$",
            discount: null,
            quatity: 1
        },
        {
            foodId: 7,
            restaurantId: 1,
            foodName: "Cheese Burger",
            restaurantName: "Burger Arena",
            price: 99.00,
            offeredPrice: null,
            foodImage: "./images/pi1.png",
            currency: "$",
            discount: null,
            quatity: 1
        },
        {
            foodId: 8,
            restaurantId: 1,
            foodName: "Cheese Burger",
            restaurantName: "Burger Arena",
            price: 99.00,
            offeredPrice: null,
            foodImage: "./images/pi1.png",
            currency: "$",
            discount: null,
            quatity: 1
        }
    ];

    const featuredRestaurant: Restaurant[] = [
        {
          "restaurantId": 1,
          "restaurantName": "Foodworld",
          "remainingDays": 5,
          "discount": 20,
          "featureImageUrl": "./images/featured-restaurants/fr-1.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-1.png",
          "time": "Fast",
          "ratings": 46
        },
        {
          "restaurantId": 2,
          "restaurantName": "Pizzahub",
          "remainingDays": 7,
          "discount": 15,
          "featureImageUrl": "./images/featured-restaurants/fr-2.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-2.png",
          "time": "Fast",
          "ratings": 40
        },
        {
          "restaurantId": 3,
          "restaurantName": "Donuts Hut",
          "remainingDays": 4,
          "discount": 10,
          "featureImageUrl": "./images/featured-restaurants/fr-3.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-3.png",
          "time": "Slow",
          "ratings": 20
        },
        {
          "restaurantId": 4,
          "restaurantName": "Donuts Hut",
          "remainingDays": 6,
          "discount": 15,
          "featureImageUrl": "./images/featured-restaurants/fr-4.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-4.png",
          "time": "Fast",
          "ratings": 50
        },
        {
          "restaurantId": 5,
          "restaurantName": "Ruby Tuesday",
          "remainingDays": 3,
          "discount": 10,
          "featureImageUrl": "./images/featured-restaurants/fr-5.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-5.png",
          "time": "Slow",
          "ratings": 26
        },
        {
          "restaurantId": 6,
          "restaurantName": "Kuakata Fried Chicken",
          "remainingDays": 8,
          "discount": 25,
          "featureImageUrl": "./images/featured-restaurants/fr-6.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-6.png",
          "time": "Fast",
          "ratings": 53
        },
        {
          "restaurantId": 7,
          "restaurantName": "Red Square",
          "remainingDays": 5,
          "discount": 10,
          "featureImageUrl": "./images/featured-restaurants/fr-7.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-7.png",
          "time": "Slow",
          "ratings": 45
        },
        {
          "restaurantId": 8,
          "restaurantName": "Taco Bell",
          "remainingDays": 4,
          "discount": 10,
          "featureImageUrl": "./images/featured-restaurants/fr-8.png",
          "restaurantLogoUrl": "./images/featured-restaurants/fr-logo-8.png",
          "time": "Fast",
          "ratings": 35
        }
    ];

    const foodCategories: Category[] = [
        {
            categoryId: 1,
            categoryImage: "./images/food/pizza.png",
            categoryName: "Pizza"
        },
        {
            categoryId: 2,
            categoryImage: "./images/food/burger.png",
            categoryName: "Burger"
        },
        {
            categoryId: 3,
            categoryImage: "./images/food/noodles.png",
            categoryName: "Noodles"
        },
        {
            categoryId: 4,
            categoryImage: "./images/food/sandwich.png",
            categoryName: "Sandwich"
        },
        {
            categoryId: 5,
            categoryImage: "./images/food/chowmin.png",
            categoryName: "Chowmin"
        },
        {
            categoryId: 6,
            categoryImage: "./images/food/steak.png",
            categoryName: "Steak"
        },
    ]

    const ads : Ads[] = [
        {
          "adId":1,
          "title": "Best deals <span style='color: #FFB30E'>Crispy Sandwiches<span>",
          "subtitle": "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.",
          "image": "./images/ads/ad1.png",
          "cta": "#"
        },
        {
          "adId":2,
          "title": "Celebrate parties with <span style='color: #FFB30E'>Fried Chicken<span>",
          "subtitle": "Get the best fried chicken smeared with a lip-smacking lemon chili flavor. Check out best deals for fried chicken.",
          "image": "./images/ads/ad2.png",
          "cta": "#"
        },
        {
          "adId":3,
          "title": "Wanna eat hot & spicy <span style='color: #FFB30E'>Pizza?<span>",
          "subtitle": "Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.",
          "image": "./images/ads/ad3.png",
          "cta": "#"
        }
      ]

    const PrevArrow = (props: any) => (
        <button
          className="absolute left-[0px] md:left-[-40px] top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-md hover:bg-yellow-600 z-2"
          onClick={props.onClick}
        >
          <i className="fa-solid fa-left-long"></i>
        </button>
    );
    
    const NextArrow = (props: any) => (
        <button
          className="absolute right-[0px] md:right-[-40px] top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-md hover:bg-yellow-600 z-2"
          onClick={props.onClick}
        >
          <i className="fa-solid fa-right-long"></i>
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
    };

    const handleAddToCart = (product: Product) => {
        console.log("added", product)
        // if(product == null){
        //     setNotification({message:"Item already present in your cart", type:"info"})
        //     return
        // }
        // setNotification({message:"Item added", type:"success"})
        dispatch(add(product));
    }
    
    return (
        <>
            <section className="min-h-130 banner-bg flex justify-center">
                <div className="container flex flex-row flex-wrap align-center justify-center ">
                    <div className="w-80 flex-grow flex flex-col justify-center align-center p-3 mx-3">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white">Are you starving?</h1>
                        <p className="text-md text-(--md-sys-color-primary) my-2">Within a few clicks, find meals that are accessible near you</p>
                        <div className="card rounded-lg shadow-lg bg-white py-5 px-3 my-2">
                            <div>
                                <div className="flex my-1 gap-4">
                                    <div className={`flex-item rounded` }>
                                        <div className={`flex flex-row align-center rounded-md justify-center text-center px-2 py-1 ${isDelivery ? 'bg-amber-100 text-(--color-primary)':''}`}>
                                            <i className="fa-solid fa-motorcycle p-1"></i>
                                            <input type="radio" id="delivery" name="mode" className="" onChange={()=>setDelivery(true)} hidden/>
                                            <label htmlFor="delivery" className="font-bold cursor-pointer">Delivery</label>

                                        </div>
                                    </div>
                                    <div className={`flex-item rounded`}>
                                        <div className={`flex flex-row align-center rounded-md justify-center px-2 py-1 ${!isDelivery ? 'bg-amber-100 text-(--color-primary)':''}`}>
                                            <i className="fa-solid fa-bag-shopping p-1"></i>
                                            <input type="radio" id="pickup" name="mode" className="" onChange={()=>setDelivery(false)} hidden/>
                                            <label htmlFor="pickup" className="font-bold cursor-pointer">Pick Up</label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="h-px my-4 bg-gray-100 border-0 dark:bg-gray-200"></hr>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white p-1 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-400">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"><img className="h-5 w-4 mx-2" src="./map-marker-alt.png" alt="map-icon"/></div>
                                        <input type="text" name="pincode" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Enter your area pincode"/>
                                        <div className="grid shrink-0 grid-cols-1 focus-within:relative mx-1">
                                            <button className="btn-grad rounded-sm  w-auto text-white" style={{cursor:"pointer"}}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex min-w-50 mx-20 flex-col justify-end mx-3">
                        <img className="max-h-80" src="./banner-food.png" alt="Tasty"/>
                    </div>
                </div>
            </section>
            <section className="flex justify-center py-20">
                <div className="container flex flex-wrap justify-center gap-4">
                    {OfferedItems.map((item)=>(
                        <div className="min-w-40 max-w-75 min-h-50 flex-grow-1 cursor-pointer duration-150 hover:scale-105 my-2">
                            <div className="rounded-xl overflow-hidden relative">
                                <img src={`${item.imgUrl}`} alt="image" className="object contain"/>
                                <div className="absolute flex flex-row flex-nowrap justify-center items-center rounded-tr-4xl bottom-0 left-0 h-20 w-30 bg-(--color-primary) text-(--md-sys-color-on-primary)">
                                    <h2 className="font-bold text-[48px]">{`${item.discount}`}</h2>
                                    <div>
                                        <span className="font-semibold">%</span>
                                        <p>OFF</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className="mt-4 mb-2 font-semibold">{`${item.restaurantName}`}</h5>
                                <span className="my-1 py-1 px-2 rounded bg-orange-100 text-(--color-warning) font-bold">{`${item.remainingDays} days remaining`}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="banner-bg-2 flex flex-col items-center py-10">
                <div className="container">
                    <h2 className="text-center text-[38px] font-bold text-(--color-warning) my-10 p-2">How does it works?</h2>
                </div>
                <div className="container flex flex-wrap justify-center gap-8">
                    <div className="flex flex-col justify-center min-w-40 max-w-60 align-center text-center">
                        <img src="./feature1.svg" alt="feature 1" className="h-24 mt-3 mb-12"/>
                        <h3 className="font-bold text-lg">Select location</h3>
                        <p>Choose the location where your food will be delivered.</p>
                    </div>
                    <div className="flex flex-col justify-center min-w-40 max-w-60 align-center text-center">
                        <img src="./feature2.svg" alt="feature 2" className="h-40"/>
                        <h3 className="font-bold text-lg">Choose order</h3>
                        <p>Check over hundreds of menus to pick your favorite food</p>
                    </div>
                    <div className="flex flex-col justify-center min-w-40 max-w-60 align-center text-center">
                        <img src="./feature3.svg" alt="feature 3" className="h-46"/>
                        <h3 className="font-bold text-lg">Pay advanced</h3>
                        <p>It's quick, safe, and simple. Select several methods of payment</p>
                    </div>
                    <div className="flex flex-col justify-center min-w-40 max-w-60 align-center text-center">
                        <img src="/feature4.svg" alt="feature 4" className="h-24 mt-2 mb-12"/>
                        <h3 className="font-bold text-lg">Enjoy meals</h3>
                        <p>Food is made and delivered directly to your home.</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center py-10">
                <div className="container">
                    <h2 className="text-center text-[38px] font-bold">Popular Items</h2>
                </div>
                <div className="container my-2">
                    <Slider {...settings}>
                        {popularProduct.map(product=>(
                            <div className="min-h-50 min-w-40 w-100 p-5 overflow-hidden">

                                <ProductCard product={product} action={(data)=>{
                                    handleAddToCart(data)
                                }} />
                            </div>
                        ))}
                    </Slider>
                    
                </div>
            </section>
            <section className="flex flex-col items-center py-10">
                <div className="container">
                    <h2 className="text-center text-[38px] font-bold">Featured Restaurants</h2>
                </div>
                <div className="container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 my-4">
                    {featuredRestaurant.map(restaurant=>(
                        <NavLink to={"#"} className="p-2">
                            <div className="card max-w-100 min-h-50">
                                <img className="rounded-xl" src={`${restaurant.featureImageUrl}`} alt={`${restaurant.restaurantName}`}/>
                                <div className="flex flex-row my-4 items-center">
                                    <img className="rounded-lg h-14 w-14" src={`${restaurant.restaurantLogoUrl}`} alt={`${restaurant.restaurantName}`}/>
                                    <div className="mx-2">
                                        <h4 className="text-[16px] font-bold">{restaurant.restaurantName}</h4>
                                        <p className="text-amber-400"><i className="fa-solid fa-star"></i> {`${restaurant.ratings}`}</p>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <center><button className="btn-grad text-white mb-4">View All <i className="fa-solid fa-arrow-right"></i></button></center>
            </section>
            <section className="bg-(--md-sys-color-background) flex flex-col items-center py-10">
                <div className="container p-2">
                    <h2 className="text-[36px] font-bold">Search by food</h2>
                </div>
                <div className="container flex flex-wrap justify-center my-4">
                    {foodCategories.map(fc=>(
                        <NavLink to={'#'} className="m-4">
                            <img className="rounded-full max-h-43" src={`${fc.categoryImage}`} alt={`${fc.categoryName}`}/>
                            <h4 className="text-center font-bold my-2">{fc.categoryName}</h4>
                        </NavLink>
                    ))}
                </div>
            </section>
            <section className="bg-(--color-bg-fade) flex flex-col items-center py-10">
                    <div className="container min-h-100 flex justify-center items-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 bg-(--md-sys-color-background) rounded-xl shadow-lg p-10">
                            <div className="border-b md:border-b-0 md:border-r  border-(--md-sys-color-outline-variant) p-10">
                                <img src="/images/we-provide-1.svg" className="max-w-50 " alt="feature 1"/>
                            </div>
                            <div className="p-10">
                                <img src="/images/we-provide-2.svg" className="max-w-50 " alt="feature 1"/>
                            </div>
                            <div className="border-t md:border-t-0 md:border-l  border-(--md-sys-color-outline-variant) p-10">
                                <img src="/images/we-provide-3.svg" className="max-w-50 " alt="feature 1"/>
                            </div>
                        </div>
                    </div>
            </section>
            <section className="bg-(--color-bg-fade) flex flex-col items-center">
                <div className="flex justify-center w-[100vw] curve-bg overflow-hidden">
                    <div className="flex flex-col-reverse md:flex-row items-center">
                        <img src="/mobile-app.png" className="max-h-100"/>
                        <div className="px-10 py-10 md:py-10 max-w-120 text-center md:text-left">
                            <h2 className="font-bold text-[36px] text-[--color-primary]">Install the app</h2>
                            <p>It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of delectable food.</p>
                            <div className="flex flex-row gap-4 my-6 justify-center md:justify-start">
                                <a href="#" className="bg-white px-4 py-2 flex flex-row flex-nowrap">
                                    <img className="w-5" src="/google-play-download.svg" alt="google playstore"/>
                                    <div className="ml-3" style={{lineHeight: 1}}>
                                        <span className="text-[10px]">GET IT ON</span>
                                        <h5>Google Play</h5>
                                    </div>
                                </a>
                                <a href="#" className="bg-white px-4 py-2 flex flex-row flex-nowrap justify-center">
                                    <img className="w-5" src="/app-store-download.svg" alt="app store"/>
                                    <div className="ml-3" style={{lineHeight: 1}}>
                                        <span className="text-[10px]">GET IT ON</span>
                                        <h5>App Store</h5>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[--md-sys-color-background] py-10">
                <div className="flex flex-col items-center p-4">
                    {ads.map((ad, index) => (
                        <div 
                            key={index} 
                            className={`card w-full max-w-280 min-h-90 shadow-2xl m-6 rounded-lg flex justify-start overflow-hidden flex-col 
                            ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                        >
                            <div>
                                <img className="h-60 md:h-90" src={`${ad.image}`} alt={`${ad.title}`} />
                            </div>
                            <div className="max-w-120 md:h-90 flex flex-col justify-between p-10">
                                <div>
                                    <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: ad.title }} />
                                    <p className="my-4">{ad.subtitle}</p>
                                </div>
                                <NavLink className="hover:text-(--color-primary) duration-300" to={`${ad.cta}`}>
                                    Proceed to order <span aria-hidden="true">&rarr;</span>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="banner-bg-footer flex flex-col justify-center items-center p-10 h-100">
                    <h2 className="font-extrabold max-w-200 text-[48px] text-center leading-[48px] text-white">Are you ready to order with the best deals?</h2>
                    <NavLink to={`#`} className="bg-(--color-warning) my-6 py-2 px-4 rounded-sm font-bold duration-300 hover:bg-amber-600 hover:scale-105">Proceed to order <span aria-hidden="true">&rarr;</span></NavLink>
            </section>
            {notification && <SimpleNotification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        </>   

    )
}

export default Home;