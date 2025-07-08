import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddBusiness from "./components/AddBusiness";
import EditBusiness from "./components/EditBusiness";
import Login from "./components/Login";
import RandomReview from "./components/Review";
import Layout from "./components/Layout";
import AddReview from "./components/AddReview";

function App() {
  const page404 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    textAlign: "center",
  };

  return (
    <Router>
      <Routes>
        <Route path="/dash" element={<Layout />}>
          <Route path="add" element={<AddBusiness />} />
          <Route path="edit" element={<EditBusiness />} />
          <Route path="add-review" element={<AddReview />} />
        </Route>
        <Route path="/review/:businessId" element={<RandomReview />} />
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <h1 style={page404}>
                404
                <br />
                Page Not Found
              </h1>
            </>
          }
        />
        {/* <Route path="/Register" element={<Register />} /> */}
        {/* <Route path="/" element={<AddBusiness />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
