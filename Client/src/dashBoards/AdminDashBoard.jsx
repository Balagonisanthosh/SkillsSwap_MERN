import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminDashBoard = () => {
  const [search, setSearch] = useState("");
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMentorsRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/mentorsRequest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setMentors(data.mentorsList || []);
    } catch (error) {
      console.error(error);
      alert("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorsRequest();
  }, []);

  async function updateMentorStatus(id, action) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/mentor/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        return alert("failed in fetching...");
      }
      const data = await response.json();
      setMentors((prev) =>
        prev.map((mentor) =>
          mentor._id === id
            ? {
                ...mentor,
                status: action === "approve" ? "approved" : "rejected",
              }
            : mentor
        )
      );

      alert(data.message);
    } catch (error) {
      alert("something went wrong");
    }
  }

  // ✅ Search by username or email
  const filteredMentors = mentors.filter((mentor) =>
    `${mentor.userId?.username || ""} ${mentor.userId?.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg px-6 py-3 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-violet-700">SkillSwap</h2>

        {/* Search Box */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 w-full max-w-md">
          <Search className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search mentor requests"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-center">Loading mentor requests...</p>
        ) : filteredMentors.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No mentor requests found
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">LinkedIn</th>
                <th className="p-3 text-left">Demo Video</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMentors.map((mentor, index) => (
                <tr key={mentor._id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{mentor.userId?.username || "—"}</td>
                  <td className="p-3">{mentor.userId?.email || "—"}</td>
                  <td className="p-3">
                    <a
                      href={mentor.linkedInURL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Profile
                    </a>
                  </td>
                  <td className="p-3">
                    <a
                      href={mentor.uploadVideo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 underline"
                    >
                      Watch Video
                    </a>
                  </td>
                  <td>
                    <button
                      className="bg-green-500 px-3 py-2 hover:bg-green-700 hover:rounded-xl hover:text-white"
                      onClick={() => {
                        updateMentorStatus(mentor._id, "approve");
                      }}
                      disabled={mentor.status !== "pending"}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-red-500 px-3 py-2 hover:bg-red-700 hover:rounded-xl hover:text-white"
                      onClick={() => {
                        updateMentorStatus(mentor._id, "reject");
                      }}
                      disabled={mentor.status !== "pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
