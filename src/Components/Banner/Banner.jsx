import { GiCheckMark } from "react-icons/gi";
import './banner.css'
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="bg-blue-50 flex flex-col md:flex-row lg:flex-row items-center">
            <div className="relative w-full md:w-[50%] lg:w-[50%]">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className=" md:pt-[180px] lg:pt-[300px]  md:pr-[50px] lg:pr-[50px] md:pb-[160px] lg:pb-[160px]">
                        <div className="flex justify-center items-center pb-28 relative">
                            <div className="w-[00px] md:w-[150px] lg:w-[250px] md:h-[150px] lg:h-[250px] absolute z-20 rounded-full bg-blue-300"></div>
                            <div className="w-[120px] md:w-[200px] lg:w-[350px] md:h-[200px] lg:h-[350px] absolute z-10 rounded-full bg-blue-200"></div>
                            <div className="w-[150px] md:w-[250px] lg:w-[450px] md:h-[250px] lg:h-[450px] absolute z-0 rounded-full bg-white"></div>
                        </div>
                    </div>
                    <img className="absolute z-30 top-10 w-[250px] lg:w-[400px] left-20" src="https://i.ibb.co/RDff5cB/pic.png" alt="" />
                </motion.div>
            </div>
            <div className=" w-full md:w-[50%] lg:w-[50%] mt-[230px] px-3 py-5 md:my-0 lg:my-16">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="banner-title">
                        <p className="text-2xl md:text-4xl md:mr-12 lg:mr-40 lg:text-6xl font-bold lg:mb-4 inline-block lg:block">Find Your  Perfect <span className="bg-blue-400 px-2 rounded-3xl text-white">Job</span> Platform</p>
                    </div>
                    <p className=" text-slate-500 my-5">Explore all the most exciting job  roles based on your interest and study major. your dream job is waiting for you.</p>
                    <div className="flex items-center gap-x-2">
                        <p className="text-white bg-[#fcca3f] p-2 rounded-lg"><GiCheckMark ></GiCheckMark></p>
                        <p className="text-sm">Stay connect to get upcoming job with <a className="text-blue-400 underline" href="#">career vista</a></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;