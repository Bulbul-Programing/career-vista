import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import loadingGif from '../../../public/loading.json'
import Lottie from 'lottie-react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { BsCalendarDay } from 'react-icons/bs';
import { GrStatusGoodSmall } from 'react-icons/gr';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BidRequest = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {

        fetch(`https://career-vista-server.vercel.app/bid_request/${user?.email}`)
            .then(res => res.json())
            .then(requestData => {
                setData(requestData)
                setLoading(false)
            })
    }, [])


    const handleStatus = (id, status) => {
        
                console.log(id);
            // fetch(`https://career-vista-server.vercel.app/categories/category/${id}`)
            // .then(res => res.json())
            // .then(d => console.log(d))
            if(status === 'Accept'){
                const updateStatus = {status:'In Progress'}
                axios.put(`https://career-vista-server.vercel.app/post_job/proses/${id}`, updateStatus )
                .then(res => {
                    if(res.data.modifiedCount > 0){
                        window.location.reload(false)
                    }
                })
                .catch(error => {
                   console.log(error);
                })
            }
            if(status === 'Reject'){
                const updateStatus = {status:'Rejected'}
                axios.put(`https://career-vista-server.vercel.app/post_job/proses/${id}`, updateStatus )
                .then(res => {
                    if(res.data.modifiedCount > 0){
                        window.location.reload(false)
                    }
                })
                .catch(error => {
                   console.log(error);
                })
            }
            
        
        console.log(status);
    }

    return (
        <div>
            <Helmet>
                <title>career vista | Bid Request</title>
            </Helmet>
            {
                loading ? <Lottie className="w-[200px] mx-auto" animationData={loadingGif}></Lottie> :
                    <div>
                        <div className="hidden md:block lg:block">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>Job title</th>
                                        <th>Job description</th>
                                        <th>status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >

                                    {
                                        data?.map(singleBid =>
                                            <tr key={singleBid._id} >
                                                <th>
                                                </th>
                                                <td className="p-0 md:pr-0 lg:p-3">
                                                    <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                        <div>
                                                            <div className="font-bold">{singleBid.job_title}</div>
                                                            <div className="text-sm opacity-50">{singleBid.company_name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* {date,price, progress, category, company_name, job_title, image} */}
                                                <div>
                                                    <td className="px-2 md:pr-0 lg:p-3 ">
                                                        <div className="w-[250px] lg:w-full md:w-full">
                                                            <div className="flex flex-col w-full md:flex-col lg:flex-row gap-y-2 md:gap-y-2 lg:gap-x-3">
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaRegMoneyBillAlt className='text-2xl text-[#ff6161d6]'></FaRegMoneyBillAlt>
                                                                    <p className='font-medium'>${singleBid.price}</p>
                                                                </div>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                                                                    <p>Deadline: <span className='text-blue-400'>{singleBid.date}</span></p>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 mt-2 font-semibold">Candidate Email : <span className="text-blue-400">{singleBid.userEmail}</span></p>
                                                        </div>
                                                    </td>
                                                </div>
                                                <td className="px-2 md:pr-0 lg:p-3">
                                                    <div className="flex gap-x-2 items-center ">
                                                        <GrStatusGoodSmall className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'Rejected' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'}`}></GrStatusGoodSmall>
                                                        <h1 className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'Rejected' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'} font-semibold`}>{singleBid.progress}</h1>
                                                    </div>
                                                </td>
                                                <th>
                                                    <div className={`${singleBid.progress === 'Pending' ? 'block' : 'hidden'}`}>
                                                        <button onClick={() => handleStatus(singleBid._id, 'Accept')} className='bg-blue-400 hover:bg-blue-300 px-3 py-2 rounded-lg text-white mr-3' >Accept</button>
                                                        <button onClick={() => handleStatus(singleBid._id, 'Reject')} className='bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white' >Reject</button>
                                                    </div>
                                                </th>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="block mx-10 md:hidden lg:hidden">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>

                                    </tr>
                                </thead>
                                <tbody >

                                    {
                                        data?.map(singleBid =>
                                            <tr key={singleBid._id} className="flex flex-col">
                                                <th>
                                                </th>
                                                <td className="p-0">
                                                    <div className="flex flex-col ">
                                                        <div className="mt-5 mb-3">
                                                            <div className="font-bold text-2xl">{singleBid.job_title}</div>
                                                            <div className="text-lg opacity-50">{singleBid.company_name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* {date,price, progress, category, company_name, job_title, image} */}
                                                <div>
                                                    <td className="p-0">
                                                        <div>
                                                            <div className="flex flex-col w-full  gap-y-2">
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaRegMoneyBillAlt className='text-2xl text-[#ff6161d6]'></FaRegMoneyBillAlt>
                                                                    <p className='font-medium'>${singleBid.price}</p>
                                                                </div>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                                                                    <p>Deadline: <span className='text-blue-400'>{singleBid.date}</span></p>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 mt-2 font-semibold">Candidate Email : <span className="text-blue-400">{singleBid.userEmail}</span></p>
                                                        </div>
                                                    </td>
                                                </div>
                                                <td className="p-0 my-2">
                                                    <div className="flex gap-x-2  items-center ">
                                                        <GrStatusGoodSmall className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'}`}></GrStatusGoodSmall>
                                                        <h1 className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'} font-semibold`}>{singleBid.progress}</h1>
                                                    </div>
                                                </td>
                                                <th className="p-0">
                                                    <div className={`${singleBid.progress === 'Pending' ? 'block' : 'hidden'}`}>
                                                        <button onClick={() => handleStatus(singleBid._id, 'Accept')} className='bg-blue-400 hover:bg-blue-300 px-3 py-2 rounded-lg text-white mr-3' >Accept</button>
                                                        <button onClick={() => handleStatus(singleBid._id, 'Reject')} className='bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white' >Reject</button>
                                                    </div>
                                                </th>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default BidRequest;