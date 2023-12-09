import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import loadingGif from '../../../public/infinite-loader.json';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { BsCalendarDay } from 'react-icons/bs';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';

const BidDetails = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const Navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['bidDetails'],
        queryFn: async () => {
            const res = await fetch(`https://career-vista-server.vercel.app/categories/category/${id}`)
            return res.json()
        }
    })
    console.log(data);
    if (isLoading) {
        return <Lottie className="w-[200px] mx-auto" animationData={loadingGif}></Lottie>
    }
    const { _id, category, hostEmail, company_name, required_technologies, deadline, description, expertise, image, job_title, location, max_price, min_price, } = data[0]

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const price = form.price.value
        const date = form.date.value
        const userEmail = form.userEmail.value
        const hostEmail = form.hostEmail.value
        const nowDate = new Date().toISOString().split('T')[0]
        const bidJobDetails = { jobId: _id, price, date, bidDate: nowDate, userEmail, hostEmail, progress: 'Pending', location, job_title, company_name, category, image }

        axios.post('https://career-vista-server.vercel.app/bid_job', bidJobDetails)
            .then(res => {
                if (res.data.acknowledged === true) {
                    swal("success", "Successfully Bid this job", 'success')
                    Navigate('/bid')
                }
            })
            .catch(error => swal("error", "already Bid this job", 'error'))
    }

    return (
        <div className='lg:py-20 mx-5 lg:mx-20 flex flex-col lg:flex-row gap-x-10 lg:gap-x-20 '>
            <Helmet>
                <title>career vista | Bid details</title>
            </Helmet>
            <div className='lg:w-[40%] flex flex-col md:flex-row lg:flex-col items-center'>
                <img className='w-full md:w-[50%] lg:w-full rounded-xl ' src={image} alt="" />
                <div className='w-full md:w-[50%] lg:w-full p-5 my-5 rounded-lg border-2 border-slate-300'>
                    <h1 className='text-4xl font-bold mb-5'>Job Details</h1>
                    <div className='flex flex-col md:flex-col lg:flex-col gap-y-1 md:gap-y-2 lg:gap-y-3 my-2 '>
                        <div className='flex gap-x-2 items-center'>
                            <FaRegMoneyBillAlt className='text-2xl text-[#ff6161d6]'></FaRegMoneyBillAlt>
                            <p className='font-medium'>${min_price} - ${max_price}</p>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <FaLocationDot className='text-xl text-[#ff6161d6]'></FaLocationDot>
                            <p>{location}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                            <p>Deadline: <span className='text-blue-400'>{deadline}</span></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className='text-xl my-2'>Require Technologies :</h1>
                        </div>
                        <div className='flex flex-row flex-wrap gap-x-1  md:flex-row lg:flex-row gap-y-2 md:gap-y-2 lg:gap-x-2'>
                            {
                                required_technologies?.map((tec, index) =>
                                    <div key={index}>
                                        <p className='bg-slate-100 font-medium py-1 px-3 rounded-md text-sm'>{tec}</p>
                                    </div>)
                            }
                        </div>

                    </div>
                    <div>
                        <button></button>
                    </div>
                </div>
            </div>
            <div className='pb-20'>
                <div>
                    <h1 className='text-4xl font-bold'>{job_title}</h1>
                    <div className='flex flex-col md:flex-row gap-y-6 lg:flex-row gap-x-3 my-4'>
                        <p className='text-sm font-semibold'>Company: <span className=' font-bold text-blue-400 bg-slate-100 px-3 py-2 rounded-lg ml-2'>{company_name}</span></p>
                        <p className='text-sm font-semibold'>Expertise: <span className=' font-bold text-blue-400 bg-slate-100 px-3 py-2 rounded-lg ml-2'>{expertise}</span></p>

                    </div>
                    <h1 className='text-xl font-bold mt-10 mb-5'>Job Description:</h1>
                    <p className='text-slate-400'>{description}</p>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-bold text-center my-3'>Bid Your <span className='text-blue-400'>Dream</span> Job</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p className='font-bold'>Price</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="number" name="price" placeholder='Price' max={max_price} defaultValue={min_price} required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Deadline Date</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="date" name="date" placeholder="Date" value={deadline} required /><br />
                        </div>
                        <div>
                            <p className='font-bold'>Your Email</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="userEmail" placeholder="email" value={user.email} readOnly required /><br />
                        </div>
                        <div>
                            <p className='font-bold'>Host Email</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="hostEmail" placeholder="email" value={hostEmail} readOnly required /><br />
                        </div>
                        <div>
                            {
                                user.email === hostEmail ? <input className="w-full bg-blue-400 opacity-40 cursor-not-allowed rounded-lg text-xl text-center font-medium py-3 text-white" type="" value='Bid Now' /> : <input className="w-full bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='Bid Now' />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BidDetails;