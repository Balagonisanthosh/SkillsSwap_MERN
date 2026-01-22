import React from "react";
import { useAuthStore } from "../store/authAuthStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">
          Unable to load profile. Please login again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          My Profile
        </h2>

        <div className="mb-3">
          <p className="text-gray-500 text-sm">Username</p>
          <p className="font-medium">{user.username}</p>
        </div>

        <div className="mb-3">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Skills Known</p>
          {user.skillsKnown?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsKnown.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No skills added</p>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">Skills To Learn</p>
          {user.skillsToLearn?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsToLearn.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
