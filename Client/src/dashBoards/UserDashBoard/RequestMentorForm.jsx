import React, { useState, useEffect } from "react";

const RequestMentorForm = ({ onClose }) => {
  const [linkedInURL, setLinkedInURL] = useState("");
  const [video, setVideo] = useState(null);
  const [mentorStatus, setMentorStatus] = useState("none");
  const [submitting, setSubmitting] = useState(false);

  // Load mentor status on mount
  useEffect(() => {
    const status = localStorage.getItem("mentorStatus") || "none";
    setMentorStatus(status);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mentorStatus === "pending") return;

    if (!linkedInURL || !video) {
      return alert("Please fill all the details");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("Please login again");
    }

    const formData = new FormData();
    formData.append("linkedInURL", linkedInURL);
    formData.append("video", video);

    try {
      setSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/mentor/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Failed to submit request");
      }

      alert(data.message);
      localStorage.setItem("mentorStatus", "pending");
      setMentorStatus("pending");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const isPending = mentorStatus === "pending";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Request to Become a Mentor
      </h2>

      {/* Pending message */}
      {isPending && (
        <div className="mb-4 text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 p-3 rounded">
          Your mentor request is currently under review.
        </div>
      )}

      {/* LinkedIn */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          LinkedIn Profile URL
        </label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/your-profile"
          value={linkedInURL}
          onChange={(e) => setLinkedInURL(e.target.value)}
          disabled={isPending}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          required
        />
      </div>

      {/* Video */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">
          Upload Demo Teaching Video
        </label>
        <input
          type="file"
          accept="video/*"
          disabled={isPending}
          onChange={(e) => setVideo(e.target.files[0])}
          className="disabled:opacity-60 border"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4"> 
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 border border-gray-400 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending || submitting}
          className={`w-1/2 py-2 rounded text-white ${
            isPending || submitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending
            ? "Request Pending"
            : submitting
            ? "Submitting..."
            : "Submit Request"}
        </button>
      </div>
    </form>
  );
};

export default RequestMentorForm;
