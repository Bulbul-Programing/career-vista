import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from 'sweetalert';

const Navbar = () => {

    const { user, logOut, setUser } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => {
                swal("Logout", "Successfully Logout", "success")
                setUser({})
            })
            .catch(() => {
                swal("Error", "Something is wrong", "error")
            })
    }

    return (
        <div>
            <div className="hidden md:block lg:block">
                <div className="navbar bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div className="md:navbar-start lg:navbar-start col-span-3 md:w-[50%] lg:w-[28%]">
                        <div >
                            <div className="flex items-center">
                                <img className="w-[60px] " src="https://i.ibb.co/8cs90wR/logo.png" alt="" />
                                <h1 className="text-xl md:text-2xl lg:text-2xl mt-3 font-bold"><span className="text-blue-400">Career</span> Vista</h1>
                            </div>
                        </div>
                    </div>
                    <div className=" hidden lg:flex lg:w-[50%]">
                        <ul className="menu menu-horizontal px-1">
                            <div className="flex gap-x-1 justify-center font-medium">
                                <NavLink className='p-3 rounded-lg' to='/'>Home</NavLink>
                                <NavLink className='p-3 rounded-lg' to='/add-job'>Add job</NavLink>
                                <NavLink className='p-3 rounded-lg' to='/post-job'>My posted jobs</NavLink>
                                <NavLink className='p-3 rounded-lg' to='/bid'>My Bids</NavLink>
                                <NavLink className='p-3 rounded-lg' to='/bid-request'>Bid Requests</NavLink>
                            </div>
                        </ul>
                    </div>
                    <div className=" flex justify-end gap-x-2  ml-0 col-span-5 lg:w-[32%]">
                        <p>{user?.displayName}</p>
                        {
                            user && <img className="rounded-full  w-[50px] h-[50px]" src={user.photoURL} alt="" />
                        }
                        {
                            user ? <button onClick={handleSignOut} className="btn bg-blue-400 text-white hover:text-black">Logout</button> : <button className="btn bg-blue-400 text-white hover:text-black"><Link to='/login'>Login</Link></button>
                        }
                    </div>
                </div>
                <div className="hidden md:block lg:hidden">
                    <div className="flex flex-wrap justify-center my-3 gap-x-5 font-medium">
                        <NavLink className='p-3 rounded-lg' to='/'>Home</NavLink>
                        <NavLink className='p-3 rounded-lg' to='/add-job'>Add job</NavLink>
                        <NavLink className='p-3 rounded-lg' to='/post-job'>My posted jobs</NavLink>
                        <NavLink className='p-3 rounded-lg' to='/bid'>My Bids</NavLink>
                        <NavLink className='p-3 rounded-lg' to='/bid-request'>Bid Requests</NavLink>
                    </div>
                </div>
            </div>


            <div className="block md:hidden lg:hidden mt-0">
                <div className=" flex items-center justify-between bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div>
                        <div >
                            <div className="flex items-center">
                                <img className="w-[60px] " src="https://i.ibb.co/8cs90wR/logo.png" alt="" />
                                <h1 className="text-xl md:text-3xl lg:text-3xl mt-3 font-bold"><span className="text-blue-400">Career</span> Vista</h1>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content ml-[-250px] z-[1] py-4 shadow bg-slate-200 rounded-box w-[300px]">
                            <div>
                                <div className="flex flex-col items-center space-y-2">
                                    <p className="text-lg">{user?.displayName}</p>
                                    {
                                        user && <img className="rounded-full  w-[50px] h-[50px]" src={user.photoURL} alt="" />
                                    }
                                    {
                                        user ? <button onClick={handleSignOut} className="btn bg-blue-400 text-white hover:text-black">Logout</button> : <button className="btn bg-blue-400 text-white hover:text-black"><Link to='/login'>Login</Link></button>
                                    }
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center my-3 gap-x-5 lg:text-lg font-medium">
                    <NavLink className='p-3 rounded-lg' to='/'>Home</NavLink>
                    <NavLink className='p-3 rounded-lg' to='/add-job'>Add job</NavLink>
                    <NavLink className='p-3 rounded-lg' to='/post-job'>My posted jobs</NavLink>
                    <NavLink className='p-3 rounded-lg' to='/bid'>My Bids</NavLink>
                    <NavLink className='p-3 rounded-lg' to='/bid-request'>Bid Requests</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
