import { Navigate, Outlet } from "react-router"


interface ProtectedRouteProps{
    isAuthenticated: boolean
}

const ProtectedRoute = ({isAuthenticated}: ProtectedRouteProps) => {
    return isAuthenticated?<Outlet/>:<Navigate to={`/`} replace/>
}

export default ProtectedRoute;