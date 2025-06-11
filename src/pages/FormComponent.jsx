import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        photoUrl: '',
        title: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.photoUrl || !formData.title || !formData.description) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
            return;
        }

        // Show confirmation dialog
        Swal.fire({
            title: 'Confirm Submission',
            text: 'Are you sure you want to submit this data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Here you would typically send the data to your database
                // console.log('Data to be sent to database:', formData);

                axios.post('http://localhost:3000/projects', formData)
                    .then(response => {

                        if (response.data.insertedId) {
                            Swal.fire('Success!', 'Data saved to database', 'success');
                        }


                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to save data', error);
                    });

                // Reset form after submission
                setFormData({
                    photoUrl: '',
                    title: '',
                    description: ''
                });
            }
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Submit Your Content</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        type="url"
                        id="photoUrl"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleInputChange}
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {formData.photoUrl && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={formData.photoUrl}
                                alt="Preview"
                                className="max-w-full h-auto max-h-48 rounded border border-gray-200"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter a title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        maxLength="100"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter a description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        rows="4"
                        maxLength="500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormComponent;