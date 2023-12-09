import swal from 'sweetalert';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const [error, setError] = useState('')
    const Navigate = useNavigate()

    const { registerNow, updateUserProfile } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const from = e.target
        const name = from.name.value
        const photo = from.photo.value
        const email = from.email.value
        const password = from.password.value


        if (password.length < 6) {
            return setError('Please set Password minimum 6 character')
        }
        else if (!/[A-Z]/.test(password)) {
            return setError('Please enter minimum one capital later')
        }
        else if (!/[@#$%^&]/.test(password)) {
            return setError('Please enter minimum one special character')
        }
        else {
            registerNow(email, password)
                .then(user => {
                    setError('')
                    if (user.user.accessToken) {
                        swal("Amazing", "Successfully account created", "success");
                        updateUserProfile(name, photo)
                            .then()
                            .catch()
                        Navigate('/login')
                    }
                })
                .catch((error) => {
                    setError(`${error.massage}`)
                })
        }
    }



    return (
        <div className="py-20 bg-[url('https://i.ibb.co/PtRQ6LX/5500661.jpg')] md:bg-none lg:bg-none bg-opacity-25 bg-center bg-cover">
            <Helmet>
                <title>career vista | Register</title>
            </Helmet>
            <div className="flex items-center justify-between px-10 backdrop-blur-[2px] py-10">
                <div className="w-[50%] hidden md:block lg:block">
                    <img className="md:w-full lg:w-[80%]" src="https://i.ibb.co/PtRQ6LX/5500661.jpg" alt="" />
                </div>
                <div className="w-full md:w-[50%] lg:w-[50%]">
                    <div className="text-center space-y-2 p-3 rounded-lg md:space-y-3 lg:space-y-5 md:w-full backdrop-blur-lg bg-opacity-90 bg-slate-200 md:bg-opacity-0 lg:bg-opacity-0 w-full lg:w-[60%] mb-10 md:mb-5 lg:mb-10">
                        <h1 className="text-4xl font-bold text-center">Please Register</h1>
                        <p className="font-semibold">Access to all features.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="name" placeholder="Name" required /> <br />
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="url" name="photo" placeholder="Photo URL" required /> <br />
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="email" placeholder="Email" required /> <br />
                        <input className=" w-full md:w-full lg:w-[60%] rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="password" name="password" placeholder="Password" required /><br />
                        <input className=" w-full md:w-full lg:w-[60%] bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='Register' />
                    </form>

                    <p className="text-lg font-bold text-red-500">{error}</p>
                    <p className="md:text-lg w-full md:w-full lg:w-[60%] mt-3 py-2 md:py-5 lg:py-5 lg:text-lg font-semibold text-center bg-opacity-90 bg-slate-200 md:bg-opacity-0 lg:bg-opacity-0 rounded-lg">Already have account<Link to='/login' className="text-blue-400 underline pb-2"> please Login</Link> </p>
                    <Link to='/'><p className='ml-5 underline text-blue-400 mt-[-20px]'>Go Home</p></Link>
                </div>
            </div>

        </div>
    );
};

export default Register;