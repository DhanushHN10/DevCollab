import {createBrowserRouter} from "react-router-dom";

import Homepage
 from "../pages/Homepage";

 import SignupPage
 from "../pages/SignupPage";
import LoginPage
 from "../pages/LoginPage";
import CompleteProfilePage from "../pages/CompleteProfilePage";
import Dashboard from "../pages/Dashboard";
import ViewProfile from "../pages/ViewProfile";


 export const router = createBrowserRouter([
    {
        path:'/',
        element:<Homepage/>,
    },

    {
        path:'/signup',
        element:<SignupPage/>
    },

    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/complete-profile',
        element:<CompleteProfilePage/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
    },
    {
        path:'/view-profile',
        element:<ViewProfile/>
    }


 ]);