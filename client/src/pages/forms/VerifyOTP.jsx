import {
  MdOutlineVerifiedUser,
  IoMdArrowBack,
} from "../../utils/resource/IconsProvider.util";
import { FormBtn } from "../../utils/resource/ComponentsProvider.util";
import logo from "../../assets/images/inventory.png"
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const handleVerifyOtp = () => {
    navigate("/auth/reset-password");
  }

  return (
    <>
        <div className="absolute top-0 left-0 w-full bg-white flex items-center justify-between px-8 mt-2">
            <span>
                <img src={logo} alt="logo" className="w-32" />
            </span>
            <a href="/auth/login" className="text-link underline font-medium">
                Create Account
            </a>
        </div>
      <div className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-6">
        <header className="flex flex-col items-center gap-1">
          <div className="h-12 w-12 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
            <MdOutlineVerifiedUser className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Verify OTP</h1>
          <p className="text-sm text-center font-light text-secondary-txt">
            We have sent a 5 digitverification code to your email
          </p>
        </header>
        <form className="flex flex-col gap-4">
          <div className="flex justify-between gap-2">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="border border-[#e0e0e0] rounded-md h-16 w-16 text-center text-xl focus:border-primary focus:ring-0 outline-none peer"
                onInput={(e) => {
                  const input = e.target;
                  input.value = input.value.replace(/[^0-9]/g, ""); // Allow only numbers
                  if (input.value.length === 1 && input.nextElementSibling) {
                    input.nextElementSibling.focus(); // Move to the next input
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    e.target.previousElementSibling
                  ) {
                    e.target.previousElementSibling.focus(); // Move to the previous input on backspace
                  }
                }}
              />
            ))}
          </div>
          <p className="text-sm text-right text-primary-txt font-regular">01:30</p>

          <div className="flex flex-col gap-6 w-full">
            <FormBtn btnText="Verify OTP" onClick={handleVerifyOtp} />

            <p className="text-sm text-center text-primary-txt font-light">
              Didnt receive the OTP?{" "}
              <button className="text-link font-medium ml-1">Resend OTP</button>
            </p>

            <button
              className="border hover:bg-[#f5f5f5] text-primary-txt px-4 py-2 rounded-md flex gap-2 items-center justify-center"
              onClick={()=>{navigate("/auth/login")}}
            >
              <IoMdArrowBack className="h-5 w-5" />
              <span className="text-sm font-medium font-body">
                Back to Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyOTP;
