import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPayment from "../components/payment/HeaderPayment";
import FooterHomePage from "../components/home/footerHomPage";
export default function Layout() {
  const location = useLocation();

  // Xác định currentStep dựa trên pathname
  let currentStep = 1;
  if (location.pathname.includes("/payment")) {
    currentStep = 2;
  } else if (location.pathname.includes("/confirm")) {
    currentStep = 3;
  }

  return (
    <div>
      <HeaderPayment currentStep={currentStep} />
      <div className="p-6">
        <Outlet /> {/* Nội dung trang sẽ hiển thị ở đây */}
      </div>
      <FooterHomePage />
    </div>
  );
}
