const express = require("express");
const businessController = require("../controllers/businessController");

const router = express.Router();

// Routes
router.post("/add", businessController.addBusiness); // Add a new business
router.get("/get/:BusinessId", businessController.getBusinessById); // Get business by BusinessId
router.get("/all", businessController.getAllBusinesses); // Get all businesses
router.put("/put/:BusinessId", businessController.updateBusiness); // Update a business
router.delete("/del/:BusinessId", businessController.deleteBusiness); // Delete a business
router.post("/add/:BusinessId/review", businessController.addReview); // Add a review to a business
router.post("/:BusinessId/reviews/bulk-upload", businessController.bulkUploadReviews); // Bulk upload reviews
router.put("/update-review-status/:businessId/:reviewDescription", businessController.updateReviewStatus);


module.exports = router;
