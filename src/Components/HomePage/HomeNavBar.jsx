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
                    <Link className='linkBtn' to="/home/order" >Order</Link>
                    <Link className='linkBtn' to="/home/menu">Menu</Link>
                    <Link className='linkBtn' to="/home/resturant">Resturant</Link>
                    <Link className='linkBtn' to="/home/customer">Customer</Link>
                </div>
                <div className='profileBtn'>
                    <span className='iconBtn'>
                        <FaUserCircle />
                    </span>
                    <button className='adminBtn' >Hello, {userProfile.name} ▾</button>
                    <div className='profileDropDown'>
                        <Link to='/home/profile' className='dropLink'>View Profile <br /></Link>
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
