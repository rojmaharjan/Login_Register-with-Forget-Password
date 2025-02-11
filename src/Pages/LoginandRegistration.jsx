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

  // Corrected data structure for each endpoint
  const dataToSend = isSignUp
    ? {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
    : {
        email: formData.email,
        password: formData.password,
        recaptchaToken
      };


      try {
        const response = await axios.post(endpoint, dataToSend);
        console.log(response.data);
        
      
        if (isSignUp) {
          toast.success("Register successful!", {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          
          
          });
        } else {
         toast.success("Sign In  successful!", {
          position: "top-right",
          autoClose: 250,
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
    <div className=" w-full bg-[#] flex items-center justify-center ">
      <div
        className={`container bg-[#F9F6E6] relative overflow-hidden w-[full] max-w-full ${
          isPanelActive ? "right-panel-active" : ""
        } md:min-h-[100vh] `}
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

         {/* Sign In Container */}
        <div
          className={`form-container sign-in-container ${
            !isSignUp ? "block" : "hidden"
          } md:block md:absolute md:top-0 md:h-full md:w-1/2 md:z-2 md:right-0 md:transition-all md:duration-600`}
        >
        <form
            className="bg-[#F8FAFC] flex items-center  flex-col px-8 md:px-12 py-4 md:h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-4xl  ">Sign In</h1>
            <SocialIcon />
            <span className="text-l mb-4 "><p>or</p> <p className="mt-2">use your account</p></span>
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              icon="mail"
              value={formData.email}
              onChange={handleInputChange}
              required
              title="Enter your email address"
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              icon="lock"
              value={formData.password}
              onChange={handleInputChange}
              required
              title="Enter your Password"
            />
            <Link
              to="./forget-password"
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
            {/* <button
              type="submit"
              className="rounded-[20px] border border-[#AAB99A] bg-[#3A91A5] text-white text-xs font-bold py-3 px-11  tracking-wider cursor-pointer transition-transform hover:opacity-90 active:scale-95 "
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </button> */}
            <button 
            type="submit"
            className="relative flex items-center px-6 py-3 overflow-hidden text-xs transition-all bg-blue-500 rounded-[5px] group">
              {/* <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span> */}
              {/* <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span> */}
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-100 -translate-x-full bg-indigo-600 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {loading ? "Signing In..." : "Login"}
              </span>
            </button>
            <div className="mt-6 text-l text-gray-700 flex ">
            <p>Don't have account? </p>
            <Link
              onClick={handleSignUpClick}
              label="Sign Up" 
              className="block ml-1 text-gray-700 hover:text-blue-500 hover:underline curser-pointer"
            >
               Click Here
            </Link>
            </div>
            

          </form>
          
        </div> 
        {/* Sign Up Container */}
        <div
          className={`form-container sign-up-container ${
            isSignUp ? "block" : "hidden"
          } md:block md:absolute  md:h-full md:w-1/2 md:opacity-0 md:z-1 md:left-0 md:transition-all md:duration-600`}
        >
           <form
            className="bg-[#F8FAFC] flex items-center  flex-col px-8 md:px-12 py-4 md:h-full text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-4xl ">Create Account</h1>
            <SocialIcon />
            <span className="text-l mb-4 ">
              <p>or</p><p className="mt-2 mb-2">use your email for registration</p>
            </span>
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              icon="person"
              value={formData.name}
              onChange={handleInputChange}
              required
              title="Enter your name"
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              icon="mail"
              value={formData.email}
              onChange={handleInputChange}
              required
              title="Enter your email address"
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              icon="lock"
              value={formData.password}
              onChange={handleInputChange}
              required
              title='Enter new password'
            />
            {/* <button
              type="submit"
              className="mt-4 rounded-[20px] border border-[#3a91a5] bg-[#BAD8B6] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform hover:opacity-90 active:scale-95"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button> */}
             <button 
             type="submit" className="relative flex items-center px-6 py-3 overflow-hidden text-xs transition-all bg-blue-500 rounded-[5px] group">
              {/* <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span> */}
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {loading ? "Signing Up..." : "Sign Up"}
              </span>
            </button>
            <div className="mt-8 text-l text-gray-700 flex flex-col md:flex-row ">
            <p>Already have an account?</p>
            <Link
              onClick={handleSignInClick}
              label="Sign In" 
              className="block ml-2 text-gray-700 hover:text-blue-500 hover:underline curser-pointer"
            >
               Sign In
            </Link>  
            </div>

          </form>
        </div>

        

        {/* Desktop Overlay Container */}
        <div className="hidden md:block overlay-container absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100 " >
          <div className="overlay  text-white relative -left-full h-full w-[200%] transform translate-x-0 transition-transform duration-600">
            <div className="overlay-panel overlay-left bg-[url('Pictures/register.png')]  bg-[#AAB99A]
             bg-contain bg-no-repeat bg-[length:90%] bg-center absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 transform translate-x-0 transition-transform duration-600 -translate-x-[20%]">
              {/* <h1 className="font-bold text-2xl mb-4">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wider mb-8">
                To keep connected with us please login with your personal info
              </p> */}
            </div>
            <div className="overlay-panel overlay-right bg-[url('Pictures/loginn.png')] bg-[#8EB486]
             bg-contain bg-no-repeat bg-[length:90%] bg-center absolute flex items-center  flex-col p-10 text-center top-0 h-full  w-1/2 transform translate-x-0 transition-transform duration-600 right-0">
              {/* <h1 className="font-bold text-2xl mb-4 text-black ">Welcome!</h1>
              <p className="text-2xl font-bold leading-5 tracking-wider mb-8 text-black">
                Sign In - To Enjoy
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