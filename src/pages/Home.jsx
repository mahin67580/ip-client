import React, { useEffect } from 'react';
import Donate from '../components/Donate';
import Banner from '../components/Banner';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Donate></Donate>

            <div>
                <div>
                    <p className='text-3xl font-bold text-center'><span className='text-primary'>DOT_IT  </span> FOUNDATION</p>
                </div>
                <Banner></Banner>
            </div>
        </div>
    );
};

export default Home;