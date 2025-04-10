import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import MyAddress from "./pages/MyAddress";
import { Menu } from "./pages/Menu";
import { Orders } from "./pages/Orders";
import { Favorite } from "./pages/Favorite";


const AppRoutes = () => {
    
    const userAuth = useSelector((state: RootState)=>state.auth.value)

    return(
        <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/cart" element={<Cart/>} />

            {/* <Route path="login" element={<Login/>}/> */}
            <Route element={<ProtectedRoute isAuthenticated={userAuth!=null?true:false}/>}>
                <Route path="/my-address" element={<MyAddress/>} />
                <Route path="/my-orders" element={<Orders/>} />
                <Route path="/favorites" element={<Favorite/>} />
                <Route path="/rewards" element={<Cart/>} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    )
    
}

export default AppRoutes;