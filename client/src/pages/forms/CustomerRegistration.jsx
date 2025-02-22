import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputFieldComponent,
  PasswordFieldComponent,
  FormBtn,
  SecondaryFormBtn,
  RadioButtonGroup,
  DropdownComponent,
} from "../../utils/resource/ComponentsProvider.util";

import {
  MdEmail,
  FcGoogle,
  RiLockPasswordFill,
  FaUserLock,
  HiUserAdd,
  MdPhone,
} from "../../utils/resource/IconsProvider.util";

import images from "../../utils/resource/ImageProvider.util";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/validator/axiosInstance";

const CustomerRegistration = () => {
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const navigate = useNavigate();

  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "India", value: "IN" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      age,
      gender,
      street,
      landmark,
      city,
      state,
      country: selectedCountry,
      zipcode,
    };

    try {
      const response = await axiosInstance.post(
        "/saarthi/auth/signup",
        formData
      );
      console.log("Registration Successful:", response.data);
      alert("Registration Successful!");
      navigate("/auth/login");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );
      alert("Registration Failed. Please try again.");
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full bg-white flex items-center justify-between px-8 mt-2">
        <span>
          <img src={images.logo} alt="logo" className="w-32" />
        </span>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-8">
        <header className="flex flex-col items-center gap-1">
          <div className="h-10 w-10 border border-[#e0e0e0] text-primary-txt rounded-lg flex items-center justify-center mb-5 ">
            <HiUserAdd className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Welcome to our Family</h1>
          <p className="text-center text-sm font-light text-secondary-txt">
            Create your account to get started
          </p>
        </header>
        <form className="flex flex-col gap-5">
          {/* for essential details */}
          {page === 1 && (
            <div className="flex flex-col gap-5">
              {/* name */}
              <div className="flex gap-3 w-full">
                <InputFieldComponent
                  label="First Name"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  icon={null}
                  value={firstName}
                  onChange={setFirstName}
                  required={true}
                />

                <InputFieldComponent
                  label="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  icon={null}
                  value={lastName}
                  onChange={setLastName}
                  required={false}
                />
              </div>

              {/* email */}
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

              {/* password */}
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
            </div>
          )}

          {/* for address details */}
          {page === 2 && (
            <div className="flex flex-col gap-5">
              {/* phone number and age */}
              <div className="flex gap-3 w-full">
                <InputFieldComponent
                  label="Contact Number"
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Your contact number"
                  icon={MdPhone}
                  value={contactNumber}
                  onChange={(value) =>
                    setContactNumber(value.replace(/\D/g, ""))
                  }
                  required={true}
                />

                <InputFieldComponent
                  label="Age"
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Your age"
                  icon={null}
                  value={age}
                  onChange={(value) =>
                    setAge(Math.max(18, parseInt(value) || 18))
                  }
                  required={true}
                />
              </div>

              {/* gender */}
              <RadioButtonGroup
                label="Select Gender"
                name="gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                selectedValue={gender}
                onChange={setGender}
                required={true}
              />
              {/* 2FA */}
              <div className="flex items-center gap-2 border p-4 rounded-lg">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <p className="text-sm font-medium text-primary-txt">
                  Enable 2FA
                </p>
              </div>
            </div>
          )}

          {page === 3 && (
            <div className="flex flex-col gap-5">
              {/* Street Address */}
              <InputFieldComponent
                label="Address"
                type="text"
                name="street"
                id="street"
                placeholder="Flat, House no., Building, Company, Apartment"
                icon={null}
                value={street}
                onChange={setStreet}
                required={true}
              />

              {/* Landmark */}
              <InputFieldComponent
                label="Landmark"
                type="text"
                name="landmark"
                id="landmark"
                placeholder="Near Landmark"
                icon={null}
                value={landmark}
                onChange={setLandmark}
                required={false}
              />

              {/* City and State */}
              <div className="flex gap-3 w-full">
                <InputFieldComponent
                  label="City"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter your city"
                  icon={null}
                  value={city}
                  onChange={setCity}
                  required={true}
                />

                <InputFieldComponent
                  label="State"
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Enter your state"
                  icon={null}
                  value={state}
                  onChange={setState}
                  required={true}
                />
              </div>

              {/* city and zipcode */}
              <div className="flex gap-3 w-full">
                <DropdownComponent
                  label="Country"
                  name="country"
                  options={countryOptions}
                  selectedValue={selectedCountry}
                  onChange={setSelectedCountry}
                  required={true}
                  placeholder="Select country"
                />

                <InputFieldComponent
                  label="Zip Code"
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  placeholder="Enter your zipcode"
                  icon={null}
                  value={zipcode}
                  onChange={setZipcode}
                  required={true}
                />
              </div>
            </div>
          )}

          <div className="w-full flex gap-3">
            {page > 1 && (
              <SecondaryFormBtn
                btnText="Previous"
                onClick={handlePreviousPage}
              />
            )}

            {page < 3 && <FormBtn btnText="Next" onClick={handleNextPage} />}

            {page === 3 && <FormBtn btnText="Submit" onClick={handleSubmit} />}
          </div>

          <div className="flex gap-3 items-center">
            <hr className="w-full" />{" "}
            <p className="text-sm text-secondary-txt font-body">OR</p>{" "}
            <hr className="w-full" />
          </div>

          <button className="border hover:bg-[#f5f5f5] text-primary-txt px-4 py-2 rounded-md flex gap-2 items-center justify-center">
            <FcGoogle className="h-5 w-5" />
            <span className="text-sm font-medium font-body">
              Signup with Google
            </span>
          </button>

          <p className="text-sm text-center text-primary-txt font-light">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-link font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default CustomerRegistration;
