import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthContext';
const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = use(AuthContext)

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/projects');
            setProjects(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchProjects();
    }, []);


    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleDelete = (id) => {

       
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                 fetchProjects();
                fetch(`http://localhost:3000/projects/${id}`, { method: "DELETE" });
                fetchProjects(); //have to call to update ui after delete
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    };


    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800"><span className='text-primary'>Our</span> Projects</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div
                        key={project._id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        {project.photoUrl && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.photoUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                                        e.target.className = "w-full h-full object-contain p-4 bg-gray-100";
                                    }}
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                            <div className="flex justify-between items-center">

                                <span className="text-sm text-gray-500">
                                    {format(new Date, 'MMM dd, yyyy')}
                                </span>

                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    onClick={() => handleViewProject(project._id)}
                                >
                                    View Details
                                </button>

                            </div>
                            <div className='mt-4'>

                                {
                                    user?.email === 'admin@gmail.com' && <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-300 transition-colors" onClick={() => handleDelete(project._id)}>Delete</button>
                                }



                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsList;