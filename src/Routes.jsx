import { createBrowserRouter } from "react-router-dom";
import Rote from "./Page/Rote/Rote";
import Home from "./Components/Home/Home";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import PrivetRoute from "./Components/PrivetRoute/PrivetRoute";
import AddJob from "./Components/AddJob/AddJob";
import BidDetails from "./Components/BidDetails/BidDetails";
import MyBids from "./Components/MyBids/MyBids";
import MyPostJob from "./Components/MyPostJob/MyPostJob";
import UpdatePost from "./Components/UpdatePost/UpdatePost";
import BidRequest from "./Components/BidRequest/BidRequest";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Rote></Rote>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: '/add-job', 
          element:<PrivetRoute><AddJob></AddJob></PrivetRoute>
        },
        {
          path: '/categories/category/:id',
          element:<PrivetRoute><BidDetails></BidDetails></PrivetRoute> ,
        },
        {
          path: '/bid',
          element: <PrivetRoute><MyBids></MyBids></PrivetRoute> 
        },
        {
          path: '/post-job',
          element: <PrivetRoute><MyPostJob></MyPostJob></PrivetRoute>
        },
        {
          path: '/post-job/update/:id',
          element:<PrivetRoute><UpdatePost></UpdatePost></PrivetRoute> 
        },
        {
          path: '/bid-request',
          element:<PrivetRoute><BidRequest></BidRequest></PrivetRoute> 
        }
      ],
    },
    {
      path: '/login',
      element: <Login></Login> 
    },
    {
      path: '/register',
      element: <Register></Register>
    }
  ]);

export default router