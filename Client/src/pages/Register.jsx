import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [knownSkillInput, setKnownSkillInput] = useState("");
  const [knownSkills, setKnownSkills] = useState([]);

  const [learnSkillInput, setLearnSkillInput] = useState("");
  const [learnSkills, setLearnSkills] = useState([]);

  const navigate = useNavigate();

  /* -------------------- SKILL HANDLERS -------------------- */
  const addSkill = (e, inputValue, setInput, skills, setSkills) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (index, skills, setSkills) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  /* -------------------- SUBMIT EVENT -------------------- */
  const handleSubmitButton = (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
      knownSkills,
      learnSkills,
    };

    console.log("Register Data:", payload);

    // 👉 later replace this with API call
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmitButton}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            placeholder="abc@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills You Know */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Skills You Know</label>
          <input
            type="text"
            value={knownSkillInput}
            placeholder="Type a skill and press Enter"
            onChange={(e) => setKnownSkillInput(e.target.value)}
            onKeyDown={(e) =>
              addSkill(
                e,
                knownSkillInput,
                setKnownSkillInput,
                knownSkills,
                setKnownSkills
              )
            }
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {knownSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    removeSkill(index, knownSkills, setKnownSkills)
                  }
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Skills You Want To Learn */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Skills You Want to Learn
          </label>
          <input
            type="text"
            value={learnSkillInput}
            placeholder="Type a skill and press Enter"
            onChange={(e) => setLearnSkillInput(e.target.value)}
            onKeyDown={(e) =>
              addSkill(
                e,
                learnSkillInput,
                setLearnSkillInput,
                learnSkills,
                setLearnSkills
              )
            }
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {learnSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    removeSkill(index, learnSkills, setLearnSkills)
                  }
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
