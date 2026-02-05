import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import HomePage from './Components/HomePage/HomePage';
import Layout from './Components/HomePage/Layout';
import Menu from './Components/HomePage/Menu/Menu';
import Order from './Components/HomePage/Order/Order';
import Resturant from './Components/HomePage/Resturant/Resturant';
import Customer from './Components/HomePage/Customer/Customer';
import Profile from './Components/HomePage/Profile/Profile';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route />
          <Route path='/home' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='order' element={<Order />} />
            <Route path='menu' element={<Menu />} />
            <Route path='resturant' element={<Resturant />} />
            <Route path='customer' element={<Customer />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
