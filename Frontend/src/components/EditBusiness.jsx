import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToaster,Message } from 'rsuite';

function EditBusiness() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", link: "" });
  const toaster = useToaster();

  // Fetch all businesses from the API
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("https://review-backend-y75n.onrender.com/businesses/all");
      setBusinesses(response.data);
      setFilteredBusinesses(response.data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []); // Empty dependency array ensures the effect runs only once

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = businesses.filter((business) =>
      business.Name.toLowerCase().includes(query)
    );
    setFilteredBusinesses(filtered);
  };

  const handleDelete = async (businessId) => {
    try {
      await axios.delete(`https://review-backend-y75n.onrender.com/businesses/del/${businessId}`);
      fetchBusinesses();
    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  const copyToClipboard = (data) => {
    const textToCopy = `${window.location.origin}/review/${data}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Copied!");
        
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="p-4 md:p-8">
      <div>
        <h2 className="mt-12 text-2xl font-bold mb-6">Edit Business</h2>

        {/* Search Filter */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Here"
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Business List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses?.map((business) => (
            <div
              key={business._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold mb-2">{business.Name}</h3>
                <h3 className="text-xl font-semibold mb-2">{business.BusinessId}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("/dash/add-review", { state: { Id: business.BusinessId } })}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(business.BusinessId);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => copyToClipboard(business.BusinessId)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Copy Url
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditBusiness;
