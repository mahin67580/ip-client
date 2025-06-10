import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Swal from 'sweetalert2';
import usericon from '../assets/8801434.png'
const Navbar = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };
    const { user, logout } = use(AuthContext)

    const handleLogout = () => {

        logout()
            .then(() => {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout  successful",
                    showConfirmButton: false,
                    timer: 1500
                });

            }).catch(() => {
                // console.log(error);
            });
    }


    // Dropdown menu items
    const projectsItems = [
        { name: "Current Projects", path: "/CurrentProjects" },
        { name: "Completed Projects", path: " " },
        { name: "Upcoming Projects", path: " " }
    ];

    const donorItems = [
        { name: "Become a Donor", path: " " },
        { name: "Donor List", path: " " },
        { name: "Lifetime Members", path: " " }
    ];

    const galleryItems = [
        { name: "Photo Gallery", path: " " },
        { name: "Video Gallery", path: " " },
        { name: "Events", path: " " }
    ];

    const Links = <>
        <NavLink to={'/'} className={'btn text-base-content mr-5'}>Home</NavLink>

        {/* Projects Dropdown */}
        <div className="dropdown dropdown-hover mr-5">
            <div tabIndex={0} className="btn text-base-content w-full ">Projects</div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                {projectsItems.map((item, index) => (
                    <li key={index}><NavLink to={item.path}>{item.name}</NavLink></li>
                ))}
            </ul>
        </div>

        {/* Donor And Lifetime Member Dropdown */}
        <div className="dropdown dropdown-hover mr-5">
            <div tabIndex={0} className="btn text-base-content">Donor And Lifetime Member</div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                {donorItems.map((item, index) => (
                    <li key={index}><NavLink to={item.path}>{item.name}</NavLink></li>
                ))}
            </ul>
        </div>

        {/* Gallery Dropdown */}
        <div className="dropdown dropdown-hover mr-5">
            <div tabIndex={0} className="btn text-base-content  w-full">Gallery</div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                {galleryItems.map((item, index) => (
                    <li key={index}><NavLink to={item.path}>{item.name}</NavLink></li>
                ))}
            </ul>
        </div>

        {user && <NavLink to={'/myprofile'} className="btn text-base-content mr-5">My profile</NavLink>}

        <button
            onClick={toggleTheme}
            className="btn btn-sm btn-primary w-[100px] ml-10 lg:ml-0  mt-1"
            data-tooltip-id="my-tooltip-2"
        >
            Toggle {theme === 'light' ? '🌙' : '☀️'}
        </button>
    </>;

    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content space-y-4   bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {
                                Links
                            }

                        </ul>
                    </div>
                    <div className='flex items-center'>

                        {
                            <Link to={'/'}><p className="btn btn-ghost text-xl text-primary">
                                DOT<span className="text-base-content">FOUNDATION</span>
                            </p>

                            </Link>
                        }

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        {
                            Links
                        }


                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <p>{user && user.email}</p> */}

                    <div className="relative group flex flex-row-reverse  items-center mr-3  ">
                        <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring-2 ring-offset-2 overflow-hidden">
                            <img src={user ? user.photoURL : usericon} className="object-cover w-full h-full" />
                        </div>

                        <span className=" text-sm font-medium mr-4   opacity-0 group-hover:opacity-100 transition-opacity">
                            {user?.displayName}
                        </span>
                    </div>



                    {
                        user ? (<Link to={'/'}><button onClick={handleLogout} className="btn bg-primary text-white">Logout</button></Link>) : (<Link to={'/login'} className="btn bg-primary text-white "> Login </Link  >)
                    }

                </div>
            </div>
            {/* <ReactTooltip
                id="my-tooltip-2"
                place="bottom"
                content="Toggle Theme"
            /> */}
        </div>
    );
};

export default Navbar;