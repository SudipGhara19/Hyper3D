import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader.js';
import { signin } from '../../api/authService';
import { signinFailure, signinStart, signinSuccess } from '../../redux/userSlice';
import { setFoldersData } from '../../redux/folderSlice';

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector((state) => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });


    //--------------------------- collecting input field data -----------------------
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    //------------------------ handle signin -----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error("All fields are required!");
            return;
        }

        // Email validation using regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        dispatch(signinStart());

        try {
            const response = await signin({ email: formData.email, password: formData.password });

            //Check if response contains an error
            if (response?.error) {
                dispatch(signinFailure(response.error));
                toast.error(response.error || "Signin failed. Try again later.");
                return; //Stop further execution
            }

            // Store token in localStorage with expiry time (1 day)
            const token = response.token;
            const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry

            localStorage.setItem("access_token", JSON.stringify({ token, expiryTime }));

            dispatch(signinSuccess(response.user));
            dispatch(setFoldersData(response.user.folders))
            toast.success("Signin successful! Redirecting...");

            setTimeout(() => {
                navigate("/");
            }, 1500)

        } catch (error) {
            dispatch(signinFailure(error.message));
            toast.error("An error occurred. Please try again later.");
        }
    };


    return (
        <div className='w-screen h-screen bg-cover bg-center flex justify-center items-center' style={{
            backgroundImage: `url('/auth-bg.webp')`
        }}>
            <div className='w-[95%] sm:w-[70%] md:w-[40%] h-[50%] sm:h-[65%] lg:h-[80%] bg-violet-400 bg-opacity-30 rounded-lg backdrop-blur-md flex flex-col items-center'>
                <img className='w-44 mt-6' src="/hyper3d.png" alt="logo" />
                <div className='text-white text-lg font-semibold flex justify-center items-center gap-2 mt-3'>
                    <FaRegUser />
                    <h2>Sign In</h2>
                </div>
                <form className='w-[80%] mt-5 flex flex-col gap-4 text-zinc-800' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='email'>Email:</label>
                        <input value={formData.email} id='email' type='email' placeholder='Email' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-zinc-800 font-semibold' htmlFor='password'>Password:</label>
                        <div className='relative w-full'>
                            <input value={formData.password} id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full p-2 rounded-lg bg-white bg-opacity-60 outline-none' required onChange={handleChange} />
                            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2'>
                                {showPassword ? (
                                    <AiOutlineEyeInvisible className='cursor-pointer text-gray-600' onClick={() => setShowPassword(false)} />
                                ) : (
                                    <AiOutlineEye className='cursor-pointer text-gray-600' onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={loading}
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
                            <span className='ml-2'>Signing in...</span>
                        </p> :
                            'Signin'}
                    </button>
                </form>

                <p className='mt-4  text-gray-800 text-sm'>Haven't an account? Create one.
                    <Link to='/signup' className='text-violet-800 text-sm font-semibold'>  SignUp</Link>
                </p>
            </div>
        </div>
    );
}

export default Signin;
