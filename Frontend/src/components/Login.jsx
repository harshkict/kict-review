import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const baseUrl = "https://review-backend-y75n.onrender.com";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login here (e.g., save token, update state)
        localStorage.setItem("Role", "Admin")
        navigate("/dash/add")
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };



  return (
    <div className="p-8">
      <h2 className=" mt-8 text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            value={formData.UserName}
            onChange={(e) =>
              setFormData({ ...formData, UserName: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={formData.Password}
            onChange={(e) =>
              setFormData({ ...formData, Password: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
