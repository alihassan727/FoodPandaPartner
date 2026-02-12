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
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={token ? '/home' : "/login"} replace />} />
          <Route path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
          <Route path='/signup'
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />

          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
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
