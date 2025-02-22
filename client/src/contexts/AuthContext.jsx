import React, { createContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/verify", {
        withCredentials: true,
      });

      // console.log("Verify Response:", response);

      const userInfo = response?.data?.payload;
      if (userInfo?.email) {
        const response1 = await axios.get(
          `http://localhost:8000/api/hcInventory/${userInfo.email}`
        );
        setCurrentUser(response1?.data?.userDetails || null);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching user info, please re-login.", error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshLoginContext = async () => {
    setLoading(true);
    await fetchUser();
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-5xl" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        refreshLoginContext,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
