import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Handling Input change for registration form.
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Register User
  const registerUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        if (result.ok) {
          alert("Successfully Registered, Now Login with your details");
          navigate("/login");
        } else {
          alert("Registration failed. Please try again.");
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Registration failed. Please try again.");
        setIsSubmitting(false);
      });
  };
  // ------------------

  // Uploading image to cloudinary
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, imageUrl: data.url });
        alert("Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-primary opacity-10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-light opacity-10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Glassmorphism Register Card */}
        <div className="w-full max-w-2xl relative z-10">
          <div className="glass-effect rounded-2xl p-8 md:p-10 shadow-2xl border border-slate-700/50">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary to-accent-light shadow-lg shadow-accent-primary/20">
                  <img
                    className="h-10 w-10"
                    src={require("../assets/logo.png")}
                    alt="Inventory Management"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2">
                Register your account
              </h2>
              <p className="text-sm text-slate-400">
                Create your account to get started
              </p>
            </div>

            {/* Registration Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 hover:border-slate-600 ${
                      errors.firstName
                        ? "border-red-500/50 focus:ring-red-500"
                        : "border-slate-700"
                    }`}
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: "" });
                      }
                    }}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 hover:border-slate-600 ${
                      errors.lastName
                        ? "border-red-500/50 focus:ring-red-500"
                        : "border-slate-700"
                    }`}
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: "" });
                      }
                    }}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 hover:border-slate-600 ${
                    errors.email
                      ? "border-red-500/50 focus:ring-red-500"
                      : "border-slate-700"
                  }`}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 hover:border-slate-600 ${
                    errors.password
                      ? "border-red-500/50 focus:ring-red-500"
                      : "border-slate-700"
                  }`}
                  placeholder="Create a password (min. 6 characters)"
                  value={form.password}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 hover:border-slate-600 ${
                    errors.phoneNumber
                      ? "border-red-500/50 focus:ring-red-500"
                      : "border-slate-700"
                  }`}
                  placeholder="Enter phone number (e.g., 923001234567)"
                  value={form.phoneNumber}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (errors.phoneNumber) {
                      setErrors({ ...errors, phoneNumber: "" });
                    }
                  }}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Profile Image
                </label>
                <UploadImage uploadImage={uploadImage} />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 focus:ring-offset-slate-900 mt-1"
                  checked
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-slate-300 cursor-pointer"
                >
                  I agree to the Terms & Conditions
                </label>
              </div>

              {/* Sign Up Button */}
              <div>
                <button
                  type="submit"
                  onClick={registerUser}
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-accent-primary to-accent-light text-white font-semibold rounded-lg shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-accent-primary hover:text-accent-light transition-colors duration-200"
                  >
                    Sign in now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
