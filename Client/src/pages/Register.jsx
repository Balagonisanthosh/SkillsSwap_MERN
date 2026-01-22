import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [knownSkillInput, setKnownSkillInput] = useState("");
  const [skillsYouKnown, setSkillsYouKnown] = useState([]);

  const [learnSkillInput, setLearnSkillInput] = useState("");
  const [skillsYouWantToLearn, setSkillsYouWantToLearn] = useState([]);

  const [loading, setLoading] = useState(false);
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

  /* -------------------- SUBMIT -------------------- */
  const handleSubmitButton = async (e) => {
    e.preventDefault();

    // 🔴 FRONTEND VALIDATION
    if (!username.trim()) {
      alert("Username is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    if (skillsYouKnown.length === 0) {
      alert("Please add at least one skill you know");
      return;
    }

    if (skillsYouWantToLearn.length === 0) {
      alert("Please add at least one skill you want to learn");
      return;
    }

    // ✅ PAYLOAD MATCHES BACKEND
    const payload = {
      username,
      email,
      password,
      skillsYouKnown,
      skillsYouWantToLearn,
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
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
            className="w-full border rounded px-3 py-2"
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
            className="w-full border rounded px-3 py-2"
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
            className="w-full border rounded px-3 py-2"
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
                skillsYouKnown,
                setSkillsYouKnown
              )
            }
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {skillsYouKnown.map((skill, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    removeSkill(index, skillsYouKnown, setSkillsYouKnown)
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
                skillsYouWantToLearn,
                setSkillsYouWantToLearn
              )
            }
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {skillsYouWantToLearn.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    removeSkill(index, skillsYouWantToLearn, setSkillsYouWantToLearn)
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
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Creating account..." : "Create Account"}
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
