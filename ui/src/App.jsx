import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import "./App.scss"
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home'
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Pay from './pages/pay/Pay';
import Success from './pages/success/Success';
import JobForm from './pages/jobForm/JobForm';
import Profle from './pages/profile/Profle';
import UpdateProfile from './pages/updateProfile/UpdateProfile';

function App() {
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client = {queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/gigs",
          element: <Gigs />
        },
        {
          path:"/gig/:id",
          element: <Gig />
        },
        {
          path:"/orders",
          element: <Orders />
        },
        {
          path:"/mygigs",
          element: <MyGigs />
        },
        {
          path:"/add",
          element: <Add />
        },
        {
          path:"/messages",
          element: <Messages />
        },
        {
          path:"/message/:id",
          element: <Message />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/pay",
          element: <Pay />
        },
        {
          path:'/success',
          element: <Success />
          
        },
        {
          path: "/job-form/:id",
          element: <JobForm />
        },
        {
          path: "/profile",
          element: <Profle />
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />
        },
        
      ]

    },
  ]);
  return (
     <div>
      <RouterProvider router={router} />
     </div>
  )
}

export default App
