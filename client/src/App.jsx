import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import FormLayout from "./layouts/FormsLayout";

import LoginForm from "./pages/forms/LoginForm";
import ForgetPassword from "./pages/forms/ForgetPassword";
import VerifyOTP from "./pages/forms/VerifyOTP";
import ResetPassword from "./pages/forms/ResetPassword";
import SellerRegistration from "./pages/forms/SellerRegistration";
import SellerLayout from "./layouts/SellerLayout";

import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";

import { UserProvider } from "./contexts/UserContext";
import SellerOrderHistory from "./pages/seller/SellerOrderHistory";
import SupplierOrders from "./pages/supplier/SupplierOrders";
import SupplierLayout from "./layouts/SupplierLayout";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <FormLayout />,
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "verify-otp",
          element: <VerifyOTP />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },

        {
          path: "seller-registration",
          element: <SellerRegistration />,
        },
      ],
    },

    {
      path: "/",
      element: <SellerLayout />,
      children: [
        {
          path: "/",
          element: <SellerDashboard />,
        },
        {
          path: "/inventory",
          element: <SellerProducts />,
        },
        {
          path: "/history",
          element: <SellerOrderHistory />,
        },
        {
          path: "/orders",
          element: <SellerOrders />,
        },
        {
          path: "/analytics",
          element: <SellerAnalytics />,
        },
      ],
    },
    {
      path: "/supplier",
      element: <SupplierLayout />,
      children: [
        {
          path: "",
          element: <SupplierOrders />,
        },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <Toaster position="top-center" />
        <RouterProvider router={routes} />
      </UserProvider>
    </>
  );
};

export default App;
