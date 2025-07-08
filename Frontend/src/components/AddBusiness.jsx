import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function AddBusiness() {
  const baseUrl = "";
  const [formData, setFormData] = useState({
    businessName: "",
    businessLink: "",
  });
  const [error, setError] = useState(null); // To handle errors
  const [success, setSuccess] = useState(""); // To handle success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(""); // Reset success message

    try {
      const response = await axios.post(
        "https://review-backend-y75n.onrender.com/businesses/add",
        {
          Name: formData.businessName,
          Link: formData.businessLink,
        }
      );
      setSuccess("Business added successfully!"); // Success message
      setFormData({ businessName: "", businessLink: "" }); // Reset the form
    } catch (error) {
      setError("Error adding business. Please try again."); // Error message
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mt-10 text-2xl font-bold text-center text-blue-600 mb-8">
        Add Business
      </h2>

      {/* Display success or error messages */}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {success && (
        <div className="text-green-600 text-center mb-4">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xl text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xl text-gray-700 mb-2">
            Business Link
          </label>
          <input
            type="url"
            value={formData.businessLink}
            onChange={(e) =>
              setFormData({ ...formData, businessLink: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddBusiness;
