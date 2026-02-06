import { useEffect, useState } from "react"
import '../../../CompnentsCSS/HomePage/Profile/Profile.css'
import profileImg from '../../../assets/profile.png'

function Profile() {
    const [userProfile, setUserProfile] = useState(null)

    {/*Profile Info GET Req */ }
    useEffect(() => {
        const loadUserProfle = async () => {
            try {
                const token = localStorage.getItem("token")
                const BASE_URL = "https://foodpandabackend-production.up.railway.app";
                const res = await fetch(`${BASE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json()
                setUserProfile(data)
            } catch (error) {
                console.log(error)
            }
        }
        loadUserProfle()
    }, [])

    if (!userProfile) return <div>Loading...</div>;

    return (
        <div className="main">
            <div className="profileDiv">
                <img className="imgdesign" src={profileImg} alt="profile img" />
                <p className="kitchenName">{`${userProfile.kitchenName} Kitchen`}</p>
                <p className="name">Name: {userProfile.name}</p>
                <p className="email">Email: {userProfile.email}</p>
                <p className="phone">Phone: {userProfile.number}</p>
                <p className="city">City: {userProfile.city}</p>
                <button className="btnEdit">Edit Profile</button>
            </div>
        </div >
    )
}

export default Profile
