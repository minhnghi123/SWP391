import React, { useMemo, memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderPayment from "../components/payment/HeaderPayment";
import FooterHomePage from "../components/home/footerHomPage";

const Layout = memo(() => {
  const location = useLocation();

  // Determine currentStep based on pathname using useMemo to avoid recalculations
  const currentStep = useMemo(() => {
    if (location.pathname.includes("/payment")) {
      return 2;
    } else if (location.pathname.includes("/confirm")) {
      return 3;
    }
    return 1;
  }, [location.pathname]);

  return (
    <div>
      <HeaderPayment currentStep={currentStep} />
      <div className="p-6">
        <Outlet /> {/* Nội dung trang sẽ hiển thị ở đây */}
      </div>
      <FooterHomePage />
    </div>
  );
});

export default Layout;
