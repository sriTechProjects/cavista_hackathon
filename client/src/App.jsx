import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layouts
import CustomerLayout from "./layouts/CustomerLayout";
import FormLayout from "./layouts/FormsLayout";

// customer components
import CustomerHomePage from "./pages/customer/CustomerHomePage";
import CustomerProductPage from "./pages/customer/CustomerProductPage";
import CustomerProductList from "./pages/customer/CustomerProductList";

// Import auth components
import LoginForm from "./pages/forms/LoginForm";
import ForgetPassword from "./pages/forms/ForgetPassword";
import VerifyOTP from "./pages/forms/VerifyOTP";
import ResetPassword from "./pages/forms/ResetPassword";
import CustomerRegistration from "./pages/forms/CustomerRegistration";
import SellerRegistration from "./pages/forms/SellerRegistration";
import SellerLayout from "./layouts/SellerLayout";

// Import seller pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";

// import context
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <CustomerLayout />,
      children: [
        {
          path: "/",
          element: <CustomerHomePage />,
        },
        {
          path: "product",
          element: <CustomerProductPage />,
        },
        {
          path: "product-list",
          element: <CustomerProductList />,
        },
      ],
    },
    // Auth routes
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
          path: "customer-registration",
          element: <CustomerRegistration />,
        },
        {
          path: "seller-registration",
          element: <SellerRegistration />,
        },
      ],
    },
    // Seller routes
    {
      path: "/seller",
      element: <SellerLayout />,
      children: [
        {
          path: "/seller",
          element: <SellerDashboard />,
        },
        {
          path: "/seller/products",
          element: <SellerProducts />,
        },
        {
          path: "/seller/orders",
          element: <SellerOrders />,
        },
        {
          path: "/seller/analytics",
          element: <SellerAnalytics />,
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
