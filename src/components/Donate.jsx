import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthContext';

const Donate = () => {

    const { user } = use(AuthContext)

    const [donate, setDonate] = useState({
        fund: '',
        contact: '',
        amount: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({
        fund: false,
        contact: false,
        amount: false,
        agreeToTerms: false
    });

    const donationFunds = [
        "General Donation",
        "Orphan Support",
        "Education Fund",
        "Mosque Construction",
        "Emergency Relief"
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonate(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    const validateForm = () => {
        const newErrors = {
            fund: !donate.fund,
            contact: !donate.contact,
            amount: !donate.amount || isNaN(donate.amount),
            agreeToTerms: !donate.agreeToTerms
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleDonateSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill all required fields correctly',
            });
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Donation submitted:', donate);

        Swal.fire({
            title: 'Thank You!',
            text: `Your donation of $${donate.amount} to ${donate.fund} has been received.`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            // Reset form after successful submission
            setDonate({
                fund: '',
                contact: '',
                amount: '',
                agreeToTerms: false
            });
        });
    };

    return (
        <div className="lg:w-[1100px] mx-auto p-6 bg-base-100 rounded-box shadow-md my-8">
    <h2 className="text-2xl font-bold text-center mb-6">Donation Form</h2>

    <form onSubmit={handleDonateSubmit} className="space-y-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
        {/* Donation Fund */}
        <div>
            <label className="label">
                <span className="label-text font-semibold">Donation Fund <span className="text-error">*</span></span>
            </label>
            <select
                name="fund"
                value={donate.fund}
                onChange={handleInputChange}
                className={`select w-full ${errors.fund ? 'select-error' : 'select-bordered'}`}
            >
                <option value="">Select Donation Fund</option>
                {donationFunds.map((fund, index) => (
                    <option key={index} value={fund}>{fund}</option>
                ))}
            </select>
            {errors.fund && <p className="text-error text-sm mt-1">Please select a donation fund</p>}
        </div>

        {/* Phone/Email */}
        <div>
            <label className="label">
                <span className="label-text font-semibold">Phone / Email <span className="text-error">*</span></span>
            </label>
            <input
                type="text"
                name="contact"
                value={donate.contact}
                onChange={handleInputChange}
                placeholder="Input valid phone number or email"
                className={`input w-full ${errors.contact ? 'input-error' : 'input-bordered'}`}
            />
            {errors.contact && <p className="text-error text-sm mt-1">Please enter a valid phone or email</p>}
        </div>

        {/* Donation Amount */}
        <div>
            <label className="label">
                <span className="label-text font-semibold">Donation Amount <span className="text-error">*</span></span>
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <input
                    type="number"
                    name="amount"
                    value={donate.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="1"
                    className={`input w-full pl-8 ${errors.amount ? 'input-error' : 'input-bordered'}`}
                />
            </div>
            {errors.amount && <p className="text-error text-sm mt-1">Please enter a valid amount</p>}
        </div>

        {/* Terms Agreement */}
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={donate.agreeToTerms}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                />
                <span className="label-text">I agree to the <a href="#" className="link link-primary">terms and conditions</a></span>
            </label>
            {errors.agreeToTerms && <p className="text-error text-sm mt-1">You must agree to the terms</p>}
        </div>

        {/* Submit Button */}
        {user ? (
            <button
                type="submit"
                className="btn btn-primary w-full"
            >
                Donate
            </button>
        ) : (
            <button
                disabled
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 opacity-50 cursor-not-allowed"
            >
                Please Login to Donate
            </button>
        )}

        <div>
            <p className="text-sm text-info ml-8">
                Get a tax rebate by donating to As-Sunnah Foundation.
                <a href="#" className="link link-info ml-1">Click here for details.</a>
            </p>
        </div>
    </form>
</div>
    );
};

export default Donate;