
const MentorCard = ({ mentor }) => {
  
  return (
    <div className="bg-white w-72 p-5 rounded-xl shadow hover:shadow-xl transition">
      {/* Avatar */}
      <div className="h-20 w-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
        {mentor.username?.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-semibold text-center">
        {mentor.username}
      </h3>

      {/* Email */}
      <p className="text-sm text-gray-500 text-center">
        {mentor.email}
      </p>

      {/* Skills (optional) */}
      {mentor.skillsYouKnown?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {mentor.skillsYouKnown.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Action */}
      <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        View Profile
      </button>
    </div>
  );
};

export default MentorCard;
