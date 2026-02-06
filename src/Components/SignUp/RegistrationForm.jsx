import '../../CompnentsCSS/SignUpCSS/RegistrationForm.css'
import { useForm } from 'react-hook-form';
import InputField from './InputField'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";

function RegistrationForm() {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate()
    //React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    //OnSubmit Function
    const onSubmit = async (signupInfo) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        }
        try {
            const BASE_URL = "https://foodpandabackend-production.up.railway.app";
            const res = await fetch(`${BASE_URL}/signup`, options)
            const data = await res.json()
            if (!data.success) {
                setErrorMsg(data.message);
                setSuccessMsg("");
                return;
            }
            setSuccessMsg(data.message);
            setErrorMsg("");
            localStorage.setItem("token", data.token)
            navigate('/home')
        } catch (error) {
            setErrorMsg("Server error. Please try again later.");
            setSuccessMsg("");
            console.log(error);
        }
        reset();
    }

    return (
        <div className='bodyContent'>
            <h1 style={{ fontFamily: "sans-serif", fontSize: "40px", fontWeight: 'lighter', marginBottom: '-20px' }}>Register your restaurant</h1>
            <h1 style={{ fontFamily: "sans-serif", fontSize: "40px", fontWeight: 'lighter', marginBottom: '-5px' }}>with us!</h1>
            <p style={{ fontSize: '20px', fontFamily: 'system-ui', fontWeight: "bold", marginBottom: '-20px' }}>Sign up easily, showcase your menu, and you can</p>
            <p style={{ fontSize: '20px', fontFamily: 'system-ui', fontWeight: "bold", marginBottom: '25px' }}>start reaching new customers</p>
            <div className='formContainer'>
                <h1 style={{ fontFamily: "sans-serif", fontSize: "28px", fontWeight: 'bolder', padding: '10px' }} >Ready to boost your sales?</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <InputField
                        variant='inputField'
                        placeholder="Enter name"
                        name="name"
                        inputType="text"
                        register={register}
                        validationRules={{
                            required: "Name is required",
                            minLength: { value: 3, message: "Name must be atleast 3 characters" },
                            maxLength: { value: 30, message: "Name can't exceed 30 characters" },
                        }}
                        error={errors.name}
                    />
                    <InputField
                        variant='inputField'
                        placeholder="Enter email"
                        name="email"
                        inputType="email"
                        register={register}
                        validationRules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Invalid email address",
                            },
                        }}
                        error={errors.email}
                    />
                    {errorMsg && <p style={{ color: 'red', marginTop: '-10px', marginBottom: '-10px' }}>{errorMsg}</p>}
                    <InputField
                        variant='inputField'
                        placeholder="Enter phone number"
                        name="number"
                        inputType="tel"
                        register={register}
                        validationRules={{
                            required: "Phone Number is required",
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message:
                                    "Phone number must be between 10 to 15 digits and only numbers",
                            },
                        }}
                        error={errors.number}
                    />
                    <InputField
                        variant='inputField'
                        placeholder="Enter password"
                        name="password"
                        inputType="password"
                        register={register}
                        validationRules={{
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                            validate: (value) =>
                                /[A-Z]/.test(value) ||
                                "Password must contain at least one uppercase letter",
                        }}
                        error={errors.password}
                    />
                    <InputField
                        variant='inputField'
                        placeholder="Enter Kitchen name"
                        name="kitchenName"
                        inputType="text"
                        register={register}
                        validationRules={{
                            required: "Kitchen Name is required",
                        }}
                        error={errors.kitchenName}
                    />
                    <select
                        className='dropDown'
                        {...register('city', { required: 'Select City' })}
                    >
                        <option value="" hidden>Select</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Multan">Multan</option>
                    </select>
                    {errors.city && <p className="error">{errors.city.message}</p>}

                    <button
                        type='submit'
                        className='registerBtn'>Register Button</button>

                </form>
                <p style={{ fontFamily: "sans-serif", fontSize: "14px", fontWeight: 'lighter', marginBottom: '-20px' }}>Already have a account? <Link to="/login" style={{ color: '#e21b70' }}>
                    Login
                </Link></p>
                <p style={{ fontSize: '11px', fontFamily: 'system-ui', marginBottom: '-20px', color: 'gray' }}>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{ color: '#e21b70' }}>Privacy Policy </a> </p>
                <p style={{ fontSize: '11px', fontFamily: 'system-ui', marginBottom: '20px', color: 'gray' }}>and <a href="https://policies.google.com/terms" style={{ color: '#e21b70' }}>Terms of Service</a> apply.</p>
            </div>
        </div>
    )
}

export default RegistrationForm
