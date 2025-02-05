import { useState } from "react";
import SocialIcon from "../components/SocialIcon";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LoginandRegistration() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const  navigate  = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState(null); 

  const handleSignInClick = () => {
    setIsSignUp(false);
    setIsPanelActive(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setIsPanelActive(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isSignUp && !recaptchaToken) {
      setError("Please verify reCAPTCHA.");
      setLoading(false);
      return;
    }

    
    
    const endpoint = isSignUp
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

      try {
        const response = await axios.post(endpoint, { ...formData, recaptchaToken });
        console.log(response.data);
      
        if (isSignUp) {
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => navigate("/dashboard"), 
          });
        } else {
          toast.success("Sign-in successful!", {
            position: "top-right",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => navigate("/dashboard"), 
          });
        }
      } catch (err) {  
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
      
  };

  return (
    <div className="min-h-screen w-full bg-[#AAB99A] flex items-center justify-center p-2">
      <div
        className={`container bg-[#F9F6E6] rounded-lg shadow-2xl relative overflow-hidden w-[95%] max-w-full ${
          isPanelActive ? "right-panel-active" : ""
        } md:min-h-[95vh]`}
      >
        {/* Mobile Overlay Panel */}
        <div className="md:hidden bg-[#3a91a5] text-white p-8 text-center">
          {!isSignUp ? (
            <div>
              <h1 className="font-bold text-xl mb-2">Hello, Friend!</h1>
              <p className="text-sm leading-5 tracking-wider mb-4">
                Enter your personal details and start your journey with us
              </p>
              <Button onClick={handleSignUpClick} label="Sign Up" />
            </div>
          ) : (
            <div>
              <h1 className="font-bold text-xl mb-2">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wider mb-4">
                To keep connected with us please login with your personal info
              </p>
              <Button onClick={handleSignInClick} label="Sign In" />
            </div>
          )}
        </div>

        {/* Sign Up Container */}
        <div
          className={`form-container sign-up-container ${
            isSignUp ? "block" : "hidden"
          } md:block md:absolute  md:h-full md:w-1/2 md:opacity-0 md:z-1 md:left-0 md:transition-all md:duration-600`}
        >
          <form
            className="bg-[#F8FAFC] flex items-center  flex-col px-8 md:px-12 py-8 md:h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-4xl ">Create Account</h1>
            <SocialIcon />
            <span className="text-sm mb-4 text-3l">
              or use your email for registration
            </span>
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              icon="person"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              icon="mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              icon="lock"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="mt-4 rounded-[20px] border border-[#3a91a5] bg-[#BAD8B6] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform hover:opacity-90 active:scale-95"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="mt-4 text-sm text-gray-700 flex ">
            <p>Already have an account?</p>
            <Link
              onClick={handleSignInClick}
              label="Sign In" 
              className="block ml-2 text-sm text-gray-700 hover:text-blue-500 hover:underline curser-pointer"
            >
               Sign In
            </Link>  
            </div>

          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`form-container sign-in-container ${
            !isSignUp ? "block" : "hidden"
          } md:block md:absolute md:top-0 md:h-full md:w-1/2 md:z-2 md:left-0 md:transition-all md:duration-600`}
        >
          <form
            className="bg-[#F8FAFC] flex items-center  flex-col px-8 md:px-12 py-9 md:h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-4xl  ">Sign In</h1>
            <SocialIcon />
            <span className="text-l mb-4 ">or use your account</span>
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              icon="mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              icon="lock"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Link
              href="./forget-password"
              className="text-l text-gray-700 hover:text-blue-500 hover:underline w-auto  mb-4 cursor-pointer w-full "
            >
              Forgot your password?
            </Link>
            {/* Recaptcha */}
            <div className="grecaptcha-wrapper shadow-sm rounded-md scale-95">
              <ReCAPTCHA
                sitekey="6LcMtcgqAAAAAFWkF8ztblXVX3GolwAO8S4-uYiy"
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
            <br/>
            <button
              type="submit"
              className="rounded-[20px] border border-[#AAB99A] bg-[#3a91a5] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform hover:opacity-90 active:scale-95"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <div className="mt-4 text-sm text-gray-700 flex ">
            <p>Don't have account? </p>
            <Link
              onClick={handleSignUpClick}
              label="Sign Up" 
              className="block ml-1 text-sm text-gray-700 hover:text-blue-500 hover:underline curser-pointer"
            >
               Click Here
            </Link>
            </div>
            

          </form>
        </div>

        {/* Desktop Overlay Container */}
        <div className="hidden md:block overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100 " >
          <div className="overlay  text-white relative -left-full h-full w-[200%] transform translate-x-0 transition-transform duration-600">
            <div className="overlay-panel overlay-left bg-[url('/register.png')]  bg-[#BAD8B6]
             bg-cover bg-center absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 transform translate-x-0 transition-transform duration-600 -translate-x-[20%]">
              {/* <h1 className="font-bold text-2xl mb-4">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wider mb-8">
                To keep connected with us please login with your personal info
              </p> */}
            </div>
            <div className="overlay-panel overlay-right bg-[url('/login.png')] bg-[#3a91a5]
             bg-cover bg-center absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 transform translate-x-0 transition-transform duration-600 right-0">
              {/* <h1 className="font-bold text-2xl mb-4">Hello, Friend!</h1>
              <p className="text-sm leading-5 tracking-wider mb-8">
                Enter your personal details and start your journey with us
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginandRegistration;