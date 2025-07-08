const Business = require("../models/businessModel");
const Counter = require("../models/counterModel");

// Controller functions
const businessController = {
    // Add a new business
    addBusiness: async (req, res) => {
        const { Name, Link } = req.body;
        try {
            let counter = await Counter.findOne({ Title: `BUS` });
            if (!counter) {
                counter = new Counter({ Title: `BUS`, Count: 1 });
            } else {
                counter.Count += 1;
            }

            const id = `BUS-${counter.Count}`
            const newBusiness = new Business({ BusinessId: id, Name, Link });
            await newBusiness.save();
            await counter.save()
            res.status(201).json({ message: "Business added successfully", business: newBusiness });
        } catch (error) {
            res.status(500).json({ message: "Error adding business", error });
        }
    },

    // Get a business by BusinessId
    getBusinessById: async (req, res) => {
        const { BusinessId } = req.params;
        try {
            const business = await Business.findOne({ BusinessId });
            if (!business) {
                return res.status(404).json({ message: "Business not found" });
            }
            res.status(200).json(business);
        } catch (error) {
            res.status(500).json({ message: "Error fetching business", error });
        }
    },

    // Get all businesses
    getAllBusinesses: async (req, res) => {
        try {
            const businesses = await Business.find();
            res.status(200).json(businesses);
        } catch (error) {
            res.status(500).json({ message: "Error fetching businesses", error });
        }
    },

    // Update a business
    updateBusiness: async (req, res) => {
        const { BusinessId } = req.params; // Extract BusinessId from request parameters
        const { Name, Link } = req.body; // Extract Name and Link from the request body
    
        if (!Name && !Link) {
            return res.status(400).json({ message: "At least one field (Name or Link) is required to update" });
        }
    
        try {
            // Use findOneAndUpdate to find and update the business record
            const updatedBusiness = await Business.findOneAndUpdate(
                { BusinessId }, // Query by BusinessId
                { ...(Name && { Name }), ...(Link && { Link }) }, // Update only if fields are provided
                { new: true } // Return the updated document
            );
    
            if (!updatedBusiness) {
                return res.status(404).json({ message: "Business not found" });
            }
    
            // Respond with the updated business
            res.status(200).json({
                message: "Business updated successfully",
                business: updatedBusiness,
            });
        } catch (error) {
            console.error("Error updating business:", error);
            res.status(500).json({ message: "Error updating business", error });
        }
    },
    
    // Delete a business
    deleteBusiness: async (req, res) => {
        const { BusinessId } = req.params;
        try {
            const deletedBusiness = await Business.findOneAndDelete({ BusinessId });
            if (!deletedBusiness) {
                return res.status(404).json({ message: "Business not found" });
            }
            res.status(200).json({ message: "Business deleted successfully", business: deletedBusiness });
        } catch (error) {
            res.status(500).json({ message: "Error deleting business", error });
        }
    },

    // Add a review to a business
    addReview: async (req, res) => {
        const { BusinessId } = req.params;
        const { Description } = req.body;
        try {
            const business = await Business.findOne({ BusinessId });
            if (!business) {
                return res.status(404).json({ message: "Business not found" });
            }
            business.Review.push({ Description, Status: "Incomplete" });
            await business.save();
            res.status(200).json({ message: "Review added successfully", business });
        } catch (error) {
            res.status(500).json({ message: "Error adding review", error });
        }
    },

    // Bulk upload reviews for a business
    bulkUploadReviews: async (req, res) => {
        const { BusinessId } = req.params; // The BusinessId of the business
        const { reviews } = req.body; // Expecting an array of review objects
        try {
            if (!Array.isArray(reviews) || reviews.length === 0) {
                return res.status(400).json({ message: "Invalid data. Please provide an array of reviews." });
            }

            // Find the business by BusinessId
            const business = await Business.findOne({ BusinessId });
            if (!business) {
                return res.status(404).json({ message: "Business not found" });
            }

            // Append the reviews to the existing Review array
            business.Review.push(...reviews);
            await business.save();

            res.status(200).json({
                message: `${reviews.length} reviews added successfully`,
                business,
            });
        } catch (error) {
            res.status(500).json({ message: "Error uploading reviews", error });
        }
    },

    updateReviewStatus: async (req, res) => {
        const { businessId, reviewDescription } = req.params;

        try {
            const result = await Business.updateOne(
                { BusinessId: businessId, "Review.Description": reviewDescription },
                { $set: { "Review.$.Status": "Approved" } }
            );
            if (result.nModified === 0) {
                return res.status(404).json({ message: "Review not found or already approved" });
            }
            res.status(200).json({ message: "Review status updated to Approved" });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    },

};

module.exports = businessController;