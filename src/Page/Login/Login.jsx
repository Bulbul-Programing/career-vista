import swal from 'sweetalert';
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const location = useLocation()
    const { login, googleLogin } = useContext(AuthContext)
    const Navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const from = e.target
        const email = from.email.value
        const password = from.password.value

        login(email, password)
            .then(user => {
                const userEmail = email
                console.log(userEmail);
                axios.post('https://career-vista-server.vercel.app/jwt', { userEmail }, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success === true) {
                            swal("Success!", "Login successfully", "success");
                            Navigate(location?.state ? location.state : '/')
                        }
                    })
                //  swal("Success!", "Login successfully", "success");
                // Navigate(location?.state ? location.state : '/')
            }
            )
            .catch(error => {
                if (error.massage === undefined) {
                    swal("ERROR", 'password do not mach', "error")
                }
            })

    }

    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                if (result.user.accessToken) {
                    console.log(result.user);
                    swal("Amazing", "Successfully account created", "success");
                    Navigate('/')
                }
            })
            .catch(error => {
                swal('Error', 'something is wrong', 'error')
            })

    }

    return (
        <div className="py-20 bg-[url('https://i.ibb.co/PtRQ6LX/5500661.jpg')] md:bg-none lg:bg-none bg-opacity-25 bg-center bg-cover">
            <Helmet>
                <title>career vista | Login</title>
            </Helmet>
            <div className="flex items-center justify-between px-10 backdrop-blur-[2px] py-10">
                <div className="w-[50%] hidden md:block lg:block">
                    <img className="md:w-full lg:w-[80%]" src="https://i.ibb.co/PtRQ6LX/5500661.jpg" alt="" />
                </div>
                <div className="w-full md:w-[50%] lg:w-[50%]">
                    <div className="text-center space-y-2 p-3 rounded-lg md:space-y-3 lg:space-y-5 md:w-[80%] backdrop-blur-lg bg-opacity-90 bg-slate-200 md:bg-opacity-0 lg:bg-opacity-0 w-full lg:w-[60%] mb-10">
                        <p className=" lg:text-blue-400 font-semibold">Welcome back!</p>
                        <h1 className="text-4xl font-bold text-center">Please Login</h1>
                        <p className="font-semibold">Access to all features.</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="email" placeholder="Email" required /> <br />
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="password" name="password" placeholder="Password" required /><br />
                        <input className=" w-full md:w-full lg:w-[60%] bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='Login' />
                    </form>
                    <button onClick={handleGoogle} className='p-2 rounded-lg my-2 bg-blue-400'><img className='w-[50px]' src="https://i.ibb.co/3sN6Cjh/google-logo-9808.png" alt="" /></button>
                    <p className="md:text-lg w-full md:w-full lg:w-[60%] mt-3 py-2 md:py-5 lg:py-5 lg:text-lg font-semibold text-center bg-opacity-90 bg-slate-200 md:bg-opacity-0 lg:bg-opacity-0 rounded-lg">Do not have account<Link to='/register' className="text-blue-400 underline pb-2"> please register</Link> </p>
                    <Link to='/'><p className='ml-5 underline text-blue-400 mt-[-20px]'>Go Home</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Login;