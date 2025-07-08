import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RandomReview = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [businessData, setBusinessData] = useState(null);
    const [randomReview, setRandomReview] = useState(null);

    // Fetch business data
    const fetchBusinessData = async () => {
        try {
            const response = await axios.get(`https://review-backend-y75n.onrender.com/businesses/get/${businessId}`);
            var filterData = response.data.Review.filter(value => value.Status === "Incomplete")
            setBusiness(filterData);
            setBusinessData(response.data);
            // console.log(response.data.Review);
        } catch (error) {
            console.error("Error fetching business data", error);
        }
    };
    useEffect(() => {
        fetchBusinessData();
    }, [businessId]);

    const updateStatus = async () => {
        try {
            const response = await axios.put(`https://review-backend-y75n.onrender.com/businesses/update-review-status/${businessId}/${randomReview.Description}`);
            console.log(response.data);
            if (response.data.message == "Review status updated to Approved") {
                window.location.assign(businessData.Link);
                fetchBusinessData();

            }
        } catch (err) {
            console.log(err);
        }
    }

    const copyToClipboard = (data) => {
        const textToCopy = `${data}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                console.log("Copied!");
                updateStatus();
                // window.location.assign(businessData.Link)
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    // Select a random review from the fetched business reviews
    useEffect(() => {
        if (business && business?.length > 0) {
            const randomIndex = Math.floor(Math.random() * business.length);
            setRandomReview(business[randomIndex]);
        }
    }, [business]);

    if (!business) {
        return <div>Loading business data...</div>;
    }

    if (!randomReview) {
        return <div>No reviews available.</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="border border-gray-300 shadow-lg rounded-lg max-w-md w-full p-6 bg-white">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Random Review</h2>
                <p className="text-gray-700 mb-6 text-center">
                    <strong className="text-gray-900">Description:</strong> {randomReview.Description}
                </p>
                <div className="flex justify-evenly">
                    <button
                        onClick={() => copyToClipboard(randomReview.Description)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                        Copy
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>


    );
};

export default RandomReview;
