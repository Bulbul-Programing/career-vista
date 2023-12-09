import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDay } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Category = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`https://career-vista-server.vercel.app/categories/Web Development`)
            .then((res) => {
                setData(res.data)
            })
            .catch()
    }, [])

    const handleClick = (categoryName = 'Web Development') => {
        axios.get(`https://career-vista-server.vercel.app/categories/${categoryName}`)
            .then((res) => {
                setData(res.data)
            })
            .catch()
    }

    return (
        <div className='border-b'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="my-10 text-center space-y-5">
                    <h1 className="text-4xl font-bold">Browse by category</h1>
                    <p className=" font-semibold text-zinc-500">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
                </div>
            </motion.div>

            <div>
                <Tabs>
                    <TabList className='text-center flex justify-center px-5 border-b border-black'>
                        <Tab>
                            <div onClick={() => handleClick('Web Development')} className='flex flex-col items-center'>
                                <img className='w-[100px] hidden md:block lg:block h-[80px] mb-2' src="https://i.ibb.co/t8brcQv/web-development.png" alt="" />
                                <h1 className='md:text-lg lg:text-lg font-bold'>Web Development</h1>
                            </div>
                        </Tab>
                        <Tab>
                            <div onClick={() => handleClick('Digital Marketing')} className='flex flex-col items-center'>
                                <img className='w-[100px]  hidden md:block lg:block rounded-lg h-[80px] mb-2' src="https://i.ibb.co/YppVNvX/digital-markting.png" alt="" />
                                <h1 className='text-lg font-bold'>Digital Marketing</h1>
                            </div>
                        </Tab>
                        <Tab>
                            <div onClick={() => handleClick('Graphic Design')} className='flex flex-col items-center'>
                                <img className='w-[100px]  hidden md:block lg:block h-[80px] mb-2' src="https://i.ibb.co/qs0v8Xn/graphic-degin.png" alt="" />
                                <h1 className='text-lg font-bold'>Graphic Design</h1>
                            </div>
                        </Tab>
                    </TabList>

                    <div className='my-10'>
                        <TabPanel>
                            <div className='space-y-8'>
                                <div>
                                    {
                                        data[0]?.category === 'Web Development' &&
                                        <div className='space-y-8'>
                                            {
                                                data?.map((singleData, index) => <CategoryCard key={index} singleData={singleData}></CategoryCard>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='space-y-8'>
                                <div>
                                    {
                                        data[0]?.category === 'Digital Marketing' &&
                                        <div className='space-y-8'>
                                            {
                                                data?.map((singleData, index) => <CategoryCard key={index} singleData={singleData}></CategoryCard>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='space-y-8'>
                                <div>
                                    {
                                        data[0]?.category === 'Graphic Design' &&
                                        <div className='space-y-8'>
                                            {
                                                data?.map((singleData, index) => <CategoryCard key={index} singleData={singleData}></CategoryCard>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

const CategoryCard = ({ singleData }) => {
    const { _id, job_title, deadline, description, category, required_technologies, expertise, image, max_price, min_price, company_name, location } = singleData
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className='flex flex-col md:flex-col lg:flex-row md:gap-y-3 items-center justify-between shadow-lg mx-5 md:mx-28 lg:mx-28 rounded-lg p-4'>

                    <div className='flex flex-col md:flex-col lg:flex-row items-center'>
                        <div>
                            <img className='w-[200px] h-[160px] rounded-lg' src={image} alt="" />
                        </div>
                        <div className='ml-4 mt-3'>
                            <h1 className='text-2xl  font-bold'>{job_title}</h1>
                            <p className='my-1 text-blue-400 font-medium'>{company_name}</p>
                            <div className='flex flex-col md:flex-col lg:flex-row gap-y-1 md:gap-y-2 lg:gap-x-7 my-2 lg:items-center'>
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
                            <div className='flex flex-col md:flex-col lg:flex-row gap-x-3 my-2 lg:items-center'>
                                <div className='hidden md:hidden lg:block'>
                                    <FcIdea className='text-xl'></FcIdea>
                                </div>
                                <div className='flex flex-row flex-wrap gap-x-1 justify-around md:flex-row lg:flex-row gap-y-2 md:gap-y-2 lg:gap-x-2'>
                                    {
                                        required_technologies?.map((tec, index) =>
                                            <div key={index}>
                                                <p className='bg-slate-100 font-medium py-1 px-2 rounded-md text-sm'>{tec}</p>
                                            </div>)
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='text-sm text-slate-500'><span className='font-bold text-base text-black'>Description: </span> {description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Link to={`/categories/category/${_id}`}><button className='btn bg-blue-400 text-white hover:text-black'>Bid now</button></Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Category;

