import React, { useEffect, useState } from 'react';



const images = [
    "https://scontent.fcgp17-1.fna.fbcdn.net/v/t39.30808-6/481655912_122223551498229546_431033724461301504_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGeqc0t1EXVy62MPOxLwl4HslZNcF_A0K6yVk1wX8DQrhgaEYIK4zrpe6dKgKbXdcVTcHlWGC7EfPP6cKI8_a5O&_nc_ohc=lznaKMi4fBsQ7kNvwE7g39H&_nc_oc=AdncypCeiU1wLNkxxKhDmV5ZK6XOpIOpxjW_ec4wWCVnKBSBd01Q8FOQXT3j1_mYBBo&_nc_zt=23&_nc_ht=scontent.fcgp17-1.fna&_nc_gid=7-pL_xfBbXwiN2w_4gcRaA&oh=00_AfNPT_GweE3Vecd_TKVR4HkPpH8hAGAV0hbHEkgtSN6WyQ&oe=684E41C5",

    "https://scontent.fcgp17-1.fna.fbcdn.net/v/t39.30808-6/476368090_122215660748229546_980923349287363142_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHkQu2dGESd7seuLFs6tTG9FSaybIBxHhYVJrJsgHEeFrHaWaDY4QUPYGmd01qqs20IjZ2O5m6uLq80VrItrzHk&_nc_ohc=uPgaphDcG9wQ7kNvwGxJldQ&_nc_oc=Adl8mJXjQVZAeQv6BIAH03J6zbjZqLV771xSgfLsrVl8pvSqL-5ZsVMV41-0Ra1QWEc&_nc_zt=23&_nc_ht=scontent.fcgp17-1.fna&_nc_gid=0gPWgEodIL2sfSJ-_mjKdw&oh=00_AfOTFjnKa3IXgZVdto4v7BF3PAg54bsEG6gE_VzQen1lCw&oe=684E1C14",

    "https://scontent.fcgp17-1.fna.fbcdn.net/v/t39.30808-6/494562328_122240722508229546_5746335783688637182_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF92mJjVF3qCoUNWIdbahnXykZAWYrsCsnKRkBZiuwKyWIyM4vodJajDzsit2lQ9pIrQ0DOfzim40kLj5wFEAE2&_nc_ohc=E3zsbzRasgEQ7kNvwFaoN9U&_nc_oc=Adl7xEwxYVZudaDQAsmiy4cFXUB7IlhFBjRdfkjlZ3zxHCAMJBY2MLMNGs4w3REqaek&_nc_zt=23&_nc_ht=scontent.fcgp17-1.fna&_nc_gid=rRtKbVQlBI8SbH9OMidKBw&oh=00_AfMydYT1_DSB0OZ8jouGh4n-Z0ZxtVKTLRaLxLuEMog1BQ&oe=684DDB62",

    "https://scontent.fcgp17-1.fna.fbcdn.net/v/t39.30808-6/475790388_122213971118229546_2003752003817887312_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGovEH9u9tP4ZC7nPZRjMRPNN_HsrXQAFE038eytdAAUeGcL5QxQbx1yhxqRFAbyJ9pfEmefiCUNPgfYJaMDtjv&_nc_ohc=YMv6fo1R_NwQ7kNvwFTZBTN&_nc_oc=AdkoDazxpmwJmVLsTPFwY-dVunTityjnvk3Xvh65QCEBRtGmEvKeotzSrU6ZAQidQyk&_nc_zt=23&_nc_ht=scontent.fcgp17-1.fna&_nc_gid=u6FiWOtmYz_OY29PXyxPmA&oh=00_AfOb2edwNT-i4dA9_b1PgqdBp6oer_tVSpM19Co0KDoPyg&oe=684E3690"




];

const Banner = () => {


    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div>
            <div className='  place-items-center px-5 mb-5'>
                <div className="relative overflow-hidden mt-5 shadow-2xl w-11/12  rounded-2xl  ">
                    <div
                        className=" flex transition-transform duration-700 ease-in-out  "
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <img key={index} src={src} className="w-full flex-shrink-0 object-cover " alt={`slide-${index}`} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;