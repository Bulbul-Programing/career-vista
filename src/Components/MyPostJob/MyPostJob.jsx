import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDay } from "react-icons/bs";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingGif from '../../../public/infinite-loader.json';
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";


const MyPostJob = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])

    useState(() => {

        fetch(`https://career-vista-server.vercel.app/my_post_job/${user.email}`)
            .then(res => res.json())
            .then(postData => {
                setData(postData)
                setLoading(false)
            })
    }, data, [])



    if (loading) {
        return <Lottie className="w-[200px] mx-auto" animationData={loadingGif}></Lottie>
    }

    return (
        <div>
            <Helmet>
                <title>career vista | My post jobs</title>
            </Helmet>
            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center my-10">My posted Job</h1>
            </div>
            <div>
                {
                    data?.length < 1 ?
                        <div>
                            <h1 className="text-3xl font-bold text-center my-10">No data found</h1>
                            <div className="flex justify-center">
                                <img className="w-[70%] lg:w-[50%]" src="https://i.ibb.co/55fTL3H/9264828.jpg" alt="" />
                            </div>
                        </div>
                        :
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 mx-5 my-10 ">
                            {
                                data?.map(singleData => <PostJob key={singleData._id} singleData={singleData} setData={setData} data={data}></PostJob>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

const PostJob = ({ singleData, setData, data }) => {
    const { _id, job_title, deadline, image, max_price, min_price, company_name, location } = singleData

    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://career-vista-server.vercel.app/post_job/delete/${_id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                swal("successfully delete", {
                                    icon: "success",
                                });
                                const remainingPost = data?.filter(oneData => oneData._id !== _id)
                                setData(remainingPost)
                            }
                        })
                        .catch(error => {
                            swal('error', 'Something is Wrong', 'error')
                        })

                    //   swal("successfully delete", {
                    //     icon: "success",
                    //   });
                }
            });

    }
    return (
        <div className='flex flex-col md:flex-col lg:flex-col md:gap-y-3 items-center justify-between shadow-lg mx-5 md:mx-5 lg:mx-5 rounded-lg px-4 py-4'>
            <div className=''>
                <div>
                    <img className='md:w-full lg:w-[300px] md:h-[200px] lg:h-[200px] rounded-lg' src={image} alt="" />
                </div>
                <div className='mt-3'>
                    <h1 className='text-2xl  font-bold'>{job_title}</h1>
                    <p className='my-1 text-blue-400 font-medium'>{company_name}</p>
                    <div className='flex flex-col md:flex-col lg:flex-col gap-y-1 md:gap-y-2 lg:gap-x-7 my-2'>
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

                </div>
            </div>
            <div className='flex justify-end'>
                <div className="flex flex-row gap-x-4">
                    <Link to={`/post-job/update/${_id}`}><button className='btn bg-blue-400 text-white hover:text-black'>Update</button></Link>
                    <button onClick={handleDelete} className='btn bg-red-400 text-white hover:text-black'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyPostJob;