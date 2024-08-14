import { createBrowserRouter } from "react-router-dom";
import { Historic } from "./pages/historic";

import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { SunDasboard } from "./pages/sun-dasboard";
import { WindDasboard } from "./pages/wind-dasboard";
import { Home } from "./pages/home";

export const route = createBrowserRouter([
    {
     path: "/",
     element: <Home/>
    },
    {
     path: "/sun",
     element: <SunDasboard/>
    },
    
    {
     path: "/wind",
     element: <WindDasboard/>
    },
    {
     path: "/historic",
     element: <Historic/>
    },
    
    
    {

    path: "/login",
    element: <Login/>
    },
    {

    path: "/signup",
    element: <Signup/>
    },
   


   
   
   ]);