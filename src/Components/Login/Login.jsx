import InputField from "../SignUp/InputField"
import '../../CompnentsCSS/LoginCSS/Login.css'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { Link } from "react-router-dom";

function Login() {
    //STATES
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()
    //React Hook Form
    const { register, handleSubmit, reset } = useForm()
    //Onsubmit Function
    const onSubmit = async (loginInfo) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }
        try {
            const BASE_URL = "https://foodpandabackend-production.up.railway.app";
            const res = await fetch(`${BASE_URL}/login`, options)
            const data = await res.json()
            if (!data.success) {
                setErrorMsg(data.message);
                setSuccessMsg("");
            } else {
                localStorage.setItem("token", data.token)
                setSuccessMsg(data.message);
                setErrorMsg("");
                navigate('/home')
            }
        } catch (error) {
            setErrorMsg("Server error. Please try again later.");
            setSuccessMsg("");
            console.log(error);
        }
        reset()
    }

    return (
        <div className="loginContainer">
            <p className='pandaText'>panda <span className='partnerText'>partner</span></p>
            <div className="loginContent">
                <h1 style={{ fontFamily: 'system-ui' }}>Log in with your email</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        variant='inputField'
                        placeholder="Email"
                        name='email'
                        inputType="email"
                        register={register}
                    />
                    <InputField
                        variant='inputField'
                        placeholder="passowrd"
                        name='password'
                        inputType='password'
                        register={register}
                    />
                    {successMsg && <p style={{ color: "green", marginTop: '-8px', marginBottom: '-10px', marginLeft: '150px' }}>{successMsg}</p>}
                    {errorMsg && <p style={{ color: 'red', marginTop: '-8px', marginBottom: '-10px', marginLeft: '150px' }}>{errorMsg}</p>}
                    <button className="loginBtn">Login</button>
                </form>
                <p style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'gray', marginBottom: '-20px' }}>By continuing you acknowledge that your personal data will be processed </p>
                <p style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'gray' }}>in accordance with the  <a href="https://www.foodpanda.com/vendor-privacy-policy/" style={{ color: '#e21b70' }}>Privacy Statement.</a></p>

                <p style={{ fontFamily: "system-ui", marginTop: '-10px' }}>No account? <Link to="/signup" style={{ color: '#e21b70' }}>
                    Partner with Foodpanda</Link></p>
            </div>
        </div>
    )
}

export default Login
