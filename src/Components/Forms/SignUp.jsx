import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { IoMdEye } from "react-icons/io";
import { VscEyeClosed } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, Toast, updateUserProfile, signInWithGoogle, setLoading } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (password.length < 6) errors.push("at least 6 characters");
    setPasswordError(
      errors.length ? `Password must include ${errors.join(", ")}.` : ""
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") validatePassword(value);
  };
  const sendToDatabase = async (
    email,
    name,
    photoURL,
    creationTime,
    lastSignInTime
  ) => {
    console.log(email, name, photoURL, creationTime, lastSignInTime);
    fetch("http://localhost:5000/Users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        photoURL,
        creationTime,
        lastSignInTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordError) return;

    const { email, password, name, photoURL } = formData;
    const navigationPath = location.state?.from || "/";
    console.log(email, password, name, photoURL);
    createUser(email, password)
      .then((res) => {
        console.log(res);
        updateUserProfile(name, photoURL);
        sendToDatabase(
          email,
          name,
          photoURL,
          res.user.metadata.creationTime,
          res.user.metadata.lastSignInTime
        );
      })
      .then(() => {
        console.log("Account Created Successfully");
        Toast("Account Created Successfully", "success");
        navigate(navigationPath, { replace: true });
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => {
        setLoading(false);
        setFormData({ name: "", email: "", photoURL: "", password: "" });
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        Toast("Login Successful", "success");
        sendToDatabase(
          res.user.email,
          res.user.displayName,
          res.user.photoURL,
          res.user.metadata.creationTime,
          res.user.metadata.lastSignInTime
        );
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-primary/20 to-primary/10 flex items-center justify-center">
      <Helmet>
        <title>VisaEase | Sign Up</title>
      </Helmet>
      <div className="flex bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-primary to-primary/70 text-white flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-extrabold mb-4">Welcome to VisaEase</h2>
          <p className="text-lg text-center mb-6">
            Join us today and embark on a seamless journey to explore endless
            possibilities.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:ring-2"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:ring-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:ring-2"
                placeholder="Enter your photo URL"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primary"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={handlePasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                >
                  {showPassword ? <VscEyeClosed /> : <IoMdEye />}
                </span>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
              Register
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/4"></span>
            <p className="text-gray-500 text-sm">OR</p>
            <span className="border-b w-1/4"></span>
          </div>
          <button
            onClick={handleSignInWithGoogle}
            className="mt-4 w-full bg-gray-200 text-primary py-2 rounded-lg flex items-center justify-center hover:bg-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.67 0 6.57 1.5 8.52 3.05l6.32-6.33C34.25 2.57 29.68.5 24 .5 14.91.5 7.27 6.74 4.13 15.13l7.66 5.94C13.8 14.38 18.52 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M47.65 24.5c0-1.49-.12-2.96-.35-4.39H24v8.79h13.55c-.58 3.03-2.27 5.4-4.87 7.07l7.67 5.96C43.58 37.33 47.65 31.49 47.65 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M11.77 27.02c-.57-1.67-.9-3.47-.9-5.32 0-1.85.33-3.65.9-5.32L4.13 15.13C1.48 20.03 0 24 0 24c0 2.59.65 5.03 1.8 7.24L11.77 27.02z"
              />
              <path
                fill="#34A853"
                d="M24 47.5c5.68 0 10.58-1.88 14.11-5.1l-7.67-5.96c-2.13 1.43-4.91 2.36-7.96 2.36-5.47 0-10.19-4.88-11.94-11.37l-7.66 5.94C7.27 41.26 14.91 47.5 24 47.5z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
