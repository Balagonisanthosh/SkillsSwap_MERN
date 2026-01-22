import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import RequestMentorForm from "./RequestMentorForm";
import MentorCard from "./MentorCard";
import { useMentorStore } from "../../store/useMentorStore";
import { useAuthStore } from "../../store/authAuthStore";



const UserDashBoards = () => {
  const [showMentorForm, setShowMentorForm] = useState(false);
  const navigate = useNavigate();

  // ✅ SAFE Zustand selectors (NO object return)
  const mentorsList = useMentorStore((state) => state.list);
  const loading = useMentorStore((state) => state.loading);
  const error = useMentorStore((state) => state.error);
  const fetchMentors = useMentorStore((state) => state.fetchMentors);

  const logout = useAuthStore((state) => state.logout);

  // ✅ Fetch mentors once on mount
  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  function handleLogOut() {
    logout();       // clears token + auth state
    navigate("/");
  }

  function navigateToProfile()
  {
    navigate("/profile");
  }
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative z-10">
        <div className="text-xl font-bold text-blue-600">MyLogo</div>

        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={()=>{navigateToProfile()}}>Profile</li>
        </ul>

        <button
          className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <div className="flex justify-center items-center mt-20">
        <button
          onClick={() => setShowMentorForm(true)}
          className="w-44 h-10 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Request as mentor
        </button>
      </div>

      {/* MODAL */}
      {showMentorForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <RequestMentorForm onClose={() => setShowMentorForm(false)} />
        </div>
      )}

      {/* Mentors */}
      <div className="mt-16 px-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
          Available Mentors
        </h2>

        {loading && <p className="text-center">Loading mentors...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {mentorsList.length === 0 ? (
          <p className="text-center text-gray-500">
            No mentors available
          </p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {mentorsList.map((mentor) => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashBoards;
