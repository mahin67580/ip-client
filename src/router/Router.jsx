import {
    createBrowserRouter,

} from "react-router";
import MainLayOut from "../Root/MainLayOut";
import Home from "../pages/Home";
import CurrentProjects from "../projects/CurrentProjects";
import Register from "../authentication/Register";
import Login from "../authentication/Login";
import Privateroute from "../private/Privateroute";
import MyProfile from "../components/MyProfile";
import Dashboard from "../pages/Dashboard";
import AddProjects from "../pages/AddProjects";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayOut,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'CurrentProjects',
                Component: CurrentProjects
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: '/myprofile',
                element:
                    (<Privateroute>
                        <MyProfile></MyProfile>
                    </Privateroute>)

            },
            {
                path: '/dashboard',
                element:
                    (<Privateroute>
                        <Dashboard></Dashboard>
                    </Privateroute>)

            },
            {
                path: '/addprojects',
                element:
                    (<Privateroute>
                        <AddProjects></AddProjects>
                    </Privateroute>)

            },
        ]
    },
]);