import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader.js';
import { signup } from '../../api/authService';



function Signup() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);


    //--------------------------- collecting input field data -----------------------
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };


    //------------------------ handle signup -----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Email validation using regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        const response = await signup({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });

        setLoading(false);

        if (response && !response.error) {
            toast.success("Signup successful! Redirecting...");
            setTimeout(() => navigate("/signin"), 1300); // Redirect after success
        }
    };

    return (
        <div className='w-screen h-screen bg-cover bg-center flex justify-center items-center' style={{
            backgroundImage: `url('/auth-bg.webp')`
        }}>
            <div className='w-[95%] sm:w-[70%] md:w-[40%] h-[70%] sm:h-[84%] lg:h-[95%] bg-violet-400 bg-opacity-30 rounded-lg backdrop-blur-md flex flex-col items-center'>
                <img className='w-44 mt-6' src="/hyper3d.png" alt="logo" />
                <div className='text-white text-lg font-semibold flex justify-center items-center gap-2 mt-3'>
                    <FaRegUser />
                    <h2>Sign Up</h2>
                </div>
                <form className='w-[80%] mt-5 flex flex-col gap-4 text-zinc-800' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='username'>Username:</label>
                        <input id='username' type='text' placeholder='Username' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='email'>Email:</label>
                        <input id='email' type='email' placeholder='Email' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='password'>Password:</label>
                        <div className='relative w-full'>
                            <input id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2'>
                                {showPassword ? (
                                    <AiOutlineEyeInvisible className='cursor-pointer text-gray-600' onClick={() => setShowPassword(false)} />
                                ) : (
                                    <AiOutlineEye className='cursor-pointer text-gray-600' onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='relative w-full'>
                            <input id='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2'>
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible className='cursor-pointer text-gray-600' onClick={() => setShowConfirmPassword(false)} />
                                ) : (
                                    <AiOutlineEye className='cursor-pointer text-gray-600' onClick={() => setShowConfirmPassword(true)} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button disabled={loading}
                        type='submit'
                        className='w-full p-2 bg-violet-700 text-white rounded-lg hover:bg-violet-700'>
                        {loading ? <p className='flex justify-center items-center'>
                            <ClipLoader
                                cssOverride={{}}
                                loading
                                color='#ffffff'
                                size={19}
                                speedMultiplier={1}
                            />
                            <span className='ml-2'>Signing up...</span>
                        </p> :
                            'sign Up'}
                    </button>
                </form>
                <p className='mt-4 text-gray-800 text-sm'>Already have an account?
                    <Link to='/signin' className='text-violet-800 text-sm font-semibold'> Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
