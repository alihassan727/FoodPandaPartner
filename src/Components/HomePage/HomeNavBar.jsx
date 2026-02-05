import { useEffect, useState } from 'react';
import '../../CompnentsCSS/HomePage/HomeNavBar.css'
import { FaUserCircle } from "react-icons/fa";

function HomeNavBar() {
    const [userProfile, setUserProfile] = useState('')

    useEffect(() => {
        const loadUserProfle = async () => {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/profile", {
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
                    <a className='linkBtn' href="/home/menu">Menu</a>
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
                        <a href="/login" className='dropLink'>Logout</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HomeNavBar
