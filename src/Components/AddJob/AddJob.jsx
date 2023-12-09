import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import swal from 'sweetalert';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AddJob = () => {
    const { user } = useContext(AuthContext)
    const [categoryValue, setCategoryValue] = useState ('Web Development')
    const [expertiseValue, setExpertiseValue] = useState('Bigener')
    const [selectedDate, setSelectedDate] = useState('');
    
    const handleCategory = (e) => {
        setCategoryValue(e.target.value)
    }
    const handleExpertise = (e) => {
        setExpertiseValue(e.target.value)
    }

    const handleDateChange = (e) => {
        const inputDate = new Date(e.target.value);
        const nowDate = new Date();

        if (inputDate >= nowDate) {
            setSelectedDate(e.target.value);
        }
        else {
            swal('error', 'Please select future date', 'error')
        }

    }


    const handleAddProduct = (e) => {
        e.preventDefault()
        const form = e.target

        const job_title = form.job_title.value
        const description = form.description.value
        const category = categoryValue
        const deadline = selectedDate
        const hostEmail = form.hostEmail.value
        const image = form.image.value
        const min_price = form.min_price.value
        const max_price = form.max_price.value
        const required_technologies = [form.required_technologies.value]
        const location = form.location.value
        const company_name = form.company_name.value
        const expertise = expertiseValue

        const newJob = { job_title, expertise, description,company_name, category, image, deadline, hostEmail, min_price, max_price, required_technologies, location }

        axios.post('https://career-vista-server.vercel.app/post_job', newJob)
        .then(res => {
            if(res.data.acknowledged === true){
                swal('success', 'successfully add job', 'success')
                form.reset()
            }
        })
        .catch(error =>  swal('Error', 'Something is Wrong', 'error'))

    }



    return (
        <div>
            <Helmet>
                <title>career vista | Add Job</title>
            </Helmet>
            <div className='bg-[url("https://i.ibb.co/x3JtNVg/bg.jpg")] bg-cover h-[200px] md:h-[300px] lg:h-[300px] flex items-center'>
                <h1 className='py-[80px] md:py-[130px] lg:py-[130px] text-center w-full text-4xl font-bold text-white bg-blue-300 bg-opacity-50'>Add a new Job</h1>
            </div>
            <div className='mt-10 px-10 md:px-20 lg:px-20'>
                <h1 className='text-2xl font-bold text-center my-5'>Job Details:</h1>
                <form onSubmit={handleAddProduct}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4'>
                        <div>
                            <p className='font-bold'>Job Title</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="job_title" placeholder='Job Title' required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Job Description:</p>
                            <textarea className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" placeholder='Job description' name="description" id="" cols="5" rows="1" required></textarea>
                        </div>
                        <div>
                            <p className='font-bold'>Job category:</p>
                            <select className='w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' value={categoryValue} onChange={handleCategory} name="category" required >
                                <option value="Web Development">Web Development</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Graphic Design">Graphic Design</option>
                            </select>
                        </div>
                        <div>
                            <p className='font-bold'>Image Link</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="url" name="image" placeholder='Image link' required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Deadline</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="date" name="deadline" placeholder='DeadLine' value={selectedDate} min={new Date().toISOString().split('T')[0]} onChange={handleDateChange} required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Email</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="hostEmail" placeholder='Email' value={user.email} required readOnly /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Minimum Salary</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="number" name="min_price" min={1} placeholder='Minimum salary' required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Maximum Salary</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="number" name="max_price" min={1} placeholder='Maximum salary' required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Require Skills</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="required_technologies" placeholder="Require Skills" required /><br />
                        </div>
                        <div>
                            <p className='font-bold'>Address</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="location" placeholder="Location" required /><br />
                        </div>
                        <div>
                            <p className='font-bold'>Company Name</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="company_name" placeholder="Company Name" required /><br />
                        </div>
                        <div>
                            <p className='font-bold'>Expertise</p>
                            <select className='w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' value={expertiseValue} onChange={handleExpertise} name="category" required >
                                <option value="Web Development">Bigener</option>
                                <option value="Digital Marketing">Intermediate</option>
                                <option value="Graphic Design">Expert</option>
                            </select>                            
                        </div>
                    </div>
                    <input className="w-full my-5 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='ADD JOB' />
                </form>
            </div>
        </div>
    );
};

export default AddJob;