import { useEffect, useState } from 'react';
import '../../CompnentsCSS/HomePage/HomeNavBar.css'
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


function HomeNavBar() {
    const [userProfile, setUserProfile] = useState('')

    useEffect(() => {
        const loadUserProfle = async () => {
            const token = localStorage.getItem("token")
            const BASE_URL = "https://foodpandabackend-production.up.railway.app";
            const res = await fetch(`${BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            setUserProfile(data)
        }
        loadUserProfle()
    }, [])
    return (
        <div>
            <nav className='navbar-container'>
                <p className='logopanda'>panda <span className='logopartner'>partner</span></p>
                <div className='navbarBtn'>
                    <a className='linkBtn' href="/home/order">Orders</a>
                    <Link className='linkBtn' to="/home/menu">Menu</Link>
                    <a className='linkBtn' href="/home/resturant">Resturant</a>
                    <a className='linkBtn' href="/home/customer">Customers</a>
                </div>
                <div className='profileBtn'>
                    <span className='iconBtn'>
                        <FaUserCircle />
                    </span>
                    <button className='adminBtn' >Hello, {userProfile.name} ▾</button>
                    <div className='profileDropDown'>
                        <a href="/home/profile" className='dropLink'>View Profile <br /></a>
                        <Link
                            to="/login"
                            className="dropLink"
                            onClick={() => localStorage.removeItem("token")}
                        >
                            Logout
                        </Link>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HomeNavBar
