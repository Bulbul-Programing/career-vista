import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDay } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

const MyBids = () => {
    const { user } = useContext(AuthContext)
    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     fetch(`https://career-vista-server.vercel.app/my_bided_job/${user.email}`)
    //     .then(res => res.json())
    //     .then(bidItems => setData(bidItems))
    // },[])

    const { data } = useQuery({
        queryKey: ['myBids'],
        queryFn: async () => {
            const res = await axios.get(`https://career-vista-server.vercel.app/my_bided_job/${user.email}`)
            return res
        }
    })

    const handleStatus = (id, status) => {

        const updateStatus = { status: 'Complete' }

        axios.put(`https://career-vista-server.vercel.app/post_job/proses/${id}`, updateStatus)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    window.location.reload(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Helmet>
                <title>career vista | My Bids</title>
            </Helmet>
            {
                data?.data?.length == 0 ?
                    <div>
                        <h1 className="text-3xl font-bold text-center my-10">No data found</h1>
                        <div className="flex justify-center">
                            <img className="w-[70%] lg:w-[50%]" src="https://i.ibb.co/55fTL3H/9264828.jpg" alt="" />
                        </div>
                    </div>
                    :
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
                                        data?.data?.map(singleBid =>
                                            <tr key={singleBid._id} >
                                                <th>
                                                </th>
                                                <td className="p-0 md:pr-0 lg:p-3">
                                                    <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={singleBid.image} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
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
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaLocationDot className='text-xl text-[#ff6161d6]'></FaLocationDot>
                                                                    <p>{singleBid.location}</p>
                                                                </div>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                                                                    <p>Deadline: <span className='text-blue-400'>{singleBid.date}</span></p>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 mt-2 font-semibold">Host Email : <span className="text-blue-400">{singleBid.hostEmail}</span></p>
                                                        </div>
                                                    </td>
                                                </div>
                                                <td className="px-2 md:pr-0 lg:p-3">
                                                    <div className="flex gap-x-2 items-center ">
                                                        <GrStatusGoodSmall className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'Rejected' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'}`}></GrStatusGoodSmall>
                                                        <h1 className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'} font-semibold`}>{singleBid.progress}</h1>
                                                    </div>
                                                </td>
                                                <th>
                                                    {
                                                        singleBid.progress === 'In Progress' ? <button onClick={() => handleStatus(singleBid._id, 'Complete')} className='bg-blue-400 px-3 py-2 rounded-lg text-white' >Complete</button> : <button className={`bg-blue-400 px-3 py-2 rounded-lg ${singleBid.progress === 'Complete' && 'hidden'} ${singleBid.progress === 'Rejected' && 'hidden'} text-white hover:cursor-not-allowed disabled:opacity-40`} disabled >Complete</button>
                                                    }
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
                                        data?.data?.map(singleBid =>
                                            <tr key={singleBid._id} className="flex flex-col">
                                                <th>
                                                </th>
                                                <td className="p-0">
                                                    <div className="flex flex-col ">
                                                        <div className="avatar">
                                                            <div className=" w-[250px] h-[200px] rounded-2xl mx-auto">
                                                                <img src={singleBid.image} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
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
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaLocationDot className='text-xl text-[#ff6161d6]'></FaLocationDot>
                                                                    <p>{singleBid.location}</p>
                                                                </div>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                                                                    <p>Deadline: <span className='text-blue-400'>{singleBid.date}</span></p>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 mt-2 font-semibold">Host Email : <span className="text-blue-400">{singleBid.hostEmail}</span></p>
                                                        </div>
                                                    </td>
                                                </div>
                                                <td className="p-0 my-2">
                                                    <div className="flex gap-x-2  items-center ">
                                                        <GrStatusGoodSmall className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'Rejected' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'}`}></GrStatusGoodSmall>
                                                        <h1 className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'} font-semibold`}>{singleBid.progress}</h1>
                                                    </div>
                                                </td>
                                                <th className="p-0 my-2">
                                                    {
                                                        singleBid.progress === 'In Progress' ? <button onClick={() => handleStatus(singleBid._id, 'Complete')} className='bg-blue-400 px-3 py-2 rounded-lg text-white' >Complete</button> : <button className={`bg-blue-400 px-3 py-2 rounded-lg ${singleBid.progress === 'Complete' && 'hidden'} ${singleBid.progress === 'Rejected' && 'hidden'} text-white hover:cursor-not-allowed disabled:opacity-40`} disabled >Complete</button>
                                                    }
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



export default MyBids;