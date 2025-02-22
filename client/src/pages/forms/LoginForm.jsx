import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// form components
// import InputFieldComponent from "./InputFieldComponent";

// import images from "../../utils/resource/ImageProvider.util";
import { Link, useNavigate } from "react-router-dom";
import InputFieldComponent from "../../components/form_components/InputFieldComponent";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import PasswordFieldComponent from "../../components/form_components/PasswordFieldComponent";
import FormBtn from "../../components/form_components/FormBtn";
import { AuthContext } from "../../contexts/AuthContext";
import { FaUserLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const LoginForm = () => {
  const { currentUser, setCurrent, refreshLoginContext, loading, setLoading } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        email ? "Password field not filled!" : "Password field not filled"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/hcInventory/signin",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        setLoading(true);
        setTimeout(async () => {
          await refreshLoginContext();
          setLoading(false);
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed! Try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#333]">
      <div className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-8 border">
        <header className="flex flex-col items-center gap-1">
          <div className="h-10 w-10 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
            <FaUserLock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Hi, Welcome Back</h1>
          <p className="text-center text-sm font-light text-secondary-txt">
            Enter your credentials to access your account
          </p>
        </header>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <InputFieldComponent
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            icon={MdEmail}
            value={email}
            onChange={setEmail}
            required={true}
          />

          <PasswordFieldComponent
            label="Password"
            name="password"
            id="password"
            placeholder="Enter your password"
            icon={RiLockPasswordFill}
            value={password}
            onChange={setPassword}
            required={true}
          />

          <div className="flex justify-between items-center gap-3">
            {/* Remember Me Checkbox */}
            <label className="flex items-center text-sm text-primary-txt cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 accent-primary-btn cursor-pointer"
                id="rememberMe"
              />
              Remember Me
            </label>

            {/* Forgot Password Link */}
            <div>
              <a
                href="/auth/forget-password"
                className="w-full text-sm text-link"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <FormBtn btnText="Login" type="submit" />

          <div className="flex gap-3 items-center">
            <hr className="w-full" />{" "}
            <p className="text-sm text-secondary-txt font-body">OR</p>{" "}
            <hr className="w-full" />
          </div>

          <button className="border hover:bg-[#f5f5f5] text-primary-txt px-4 py-2 rounded-md flex gap-2 items-center justify-center">
            <FcGoogle className="h-5 w-5" />
            <span className="text-sm font-medium font-body">
              Continue with Google
            </span>
          </button>

          <p className="text-sm text-center text-primary-txt font-light">
            <p>Dont have an account?</p>{" "}
            <Link
              to="/auth/customer-registration"
              className="text-link font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
