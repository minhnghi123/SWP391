import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import Stage1Payment from "../pages/stage1PaymentPage";
import Stage2Payment from "../pages/stage2PaymentPage";
import Stage3Payment from "../pages/stage3PaymentPage";
import Test from "../components/test";
import VariantsPage from "../pages/variantsPage";
import AboutPage from "../pages/aboutPage";
import PageProfile from "../pages/PageProfile";
import DashboardPage from "../pages/dashboardPage";
import FeedbackPage from "../pages/feedbackPage";
import Detail from "../components/variants/DetailInformationVaccine";
import StaffPage from "../pages/staffPage";
import { FeedbackProvider } from "../components/Context/FeedbackContext";
import { AuthProvider } from "../components/Context/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";
import ModalReloadPage from "../components/modalReloadPage";
import { ToastContainer } from "react-toastify";
import Layout from "../pages/LayoutPayment";
function App() {
  const [showModal, setShowModal] = useState(false);
  const timeoutIdRef = useRef(null);
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Các trang KHÔNG áp dụng reset timer (bỏ qua login)
  const excludedPaths = ["/loginPage"];

  // Hàm reset timer, chỉ gọi khi click vào button
  const resetTimer = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setShowModal(false);

    const token = localStorage.getItem("authTokens");
    if (token && !excludedPaths.includes(location.pathname)) {
      timeoutIdRef.current = setTimeout(() => {
        setShowModal(true);
      }, 1000 * 60 * 30);
    }
  };

  const resettimeAfter10p = () => {
    setShowModal(false);
    resetTimer();

    window.location.reload();
  };

  useEffect(() => {
    // Nếu đang ở trang login, không chạy reset timer
    if (!excludedPaths.includes(location.pathname)) {
      resetTimer();
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [location.pathname]); // Chạy lại khi trang thay đổi

  return (
    <AuthProvider>
      <ToastContainer autoClose={1500} position="bottom-right" />
      {showModal && (
        <ModalReloadPage
          onRefresh={resettimeAfter10p}
          onClose={() => setShowModal(false)}
          isShow={showModal}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/variantsPage" element={<VariantsPage />} />

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboardPage/:section" element={<DashboardPage />} />
          <Route path="/staffPage/:section" element={<StaffPage />} />
          <Route path="/pageProfile/:section/:id" element={<PageProfile />} />
          <Route path="/feedbackPage" element={<FeedbackProvider><FeedbackPage /></FeedbackProvider>} />



          <Route element={<Layout />}>
            <Route path="/information/:id" element={<Stage1Payment />} />
            <Route path="/payment/:id" element={<Stage2Payment />} />
            <Route path="/confirm/:status" element={<Stage3Payment />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
