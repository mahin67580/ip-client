import React, { useEffect } from 'react';
import { Link } from 'react-router';

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Home';
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='  '>
            <h1 className='text-center text-2xl font-bold p-4'>ADMIN DASHBOARD</h1>
            <div className='grid grid-cols-2 lg:grid-cols-6 p-5 place-items-center'>
                <div>
                    <Link to={'/addprojects'}><button className='btn btn-primary '>Add Projects</button></Link>
                </div>
                <div>
                    <Link><button className='btn btn-primary '>Add Donations</button></Link>
                </div>
                <div>
                    <Link><button className='btn btn-primary '>Add News</button></Link>
                </div>
                <div>
                    <Link><button className='btn btn-primary '>Add Videos</button></Link>
                </div>
                <div>
                    <Link><button className='btn btn-primary '>Add Images</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;