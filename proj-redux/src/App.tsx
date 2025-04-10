import './App.css'
import Header from './component/Header'
import { Outlet, useLocation } from 'react-router'
import AppRoutes from './AppRoutes'
import { useEffect } from 'react'
import Footer from './component/Footer'


function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {

  useEffect(()=>{
    var root = document.getElementById('root')
    root?.classList.add("light")
  })

  return (
    <>
      <Header/>
      <ScrollToTop/>
      <AppRoutes/>
      <Outlet/>
      <Footer/>
    </>

  )
}

export default App
