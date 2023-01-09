import axios from '../Axios/AxiosInstance'; 
import forgotImg from '../assets/forgot.jpeg';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const ChangePssword = () => {

    const [error, setError] = useState(false)

    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const Submit = (e) => {
        const { otp } = e
        if (otp) {
            axios.post("/changepassword", e)
                .then((response) => {
                      navigate('/')
                }).catch((error) => {
                    const errormsg = error.response.data.msg
                    setError(errormsg)
                })
        }
    }

    return (
        <div className="flex justify-center  min-h-screen place-items-center">
            <div className=" m-4 p-12 bg-white hidden md:block md:w-1/2  lg:w-5/12">
                <img src={forgotImg} alt='#' className="w-full" />
            </div>
            <div className="w-11/12 p-12 m-4 bg-white sm:w-8/12 md:w-1/2 border rounded-md shadow-lg lg:w-4/12">
                <h1 className="text-xl text-center font-semibold">Change Password</h1>
                {error && <h1 className="text-red-500 text-center mx-auto">{error}</h1>}
                <form className="mt-6" onSubmit={handleSubmit(Submit)}>
                    <label for="otp" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Enter OTP</label>
                    <input id="otp" type="otp" name="otp"
                        className="block w-full p-3 mt-2 text-gray-700 rounded bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                        {...register("otp", {
                            required: "otp Required",
                            pattern: {
                                value: /^\d{4}$/,
                                message: "invalid otp "
                            }
                        })} />
                    {errors.otp && (<span className='text-red-500'>{errors.otp.message}</span>)}
                    <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">New Password</label>
                    <input id="password" type="password" name="password"
                        className="block w-full p-3 mt-2 text-gray-700 rounded bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                        {...register("password", {
                            required: "password Required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "minimum 8 characters it must contains letters & digit "
                            }
                        })} />
                    {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
                    <button type="submit" className="w-full py-3 mt-6 font-medium rounded tracking-widest text-white uppercase bg-blue-500 shadow-lg focus:outline-none hover:bg-blue-700 hover:shadow-none">
                        change 
                    </button>
                    <Link to="/">
                        <p className=" justify-between inline-block mt-4 text-base text-gray-500 cursor-pointer hover:text-blue-800">login?</p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default ChangePssword
