import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="flex justify-center">
                <img className="w-[600px]" src="https://i.ibb.co/4J4fxZ7/dribbble-1.gif" alt="" />
            </div>
            <p className="text-3xl mt-[-70px] md:mt-[-90px] lg:mt-[-100px] font-bold text-center">Oops Data Not Found !</p>
            <div className="flex justify-center my-5">
                <Link to='/'><button className="btn bg-blue-400 text-white">Go Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;