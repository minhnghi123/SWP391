import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import PaymentPage from '../pages/paymentPage';
import Test from '../components/test';
import VariantsPage from '../pages/variantsPage';
import AboutPage from '../pages/aboutPage';
import PageProfile from '../pages/PageProfile';
import DashboardPage from '../pages/dashboardPage';
import FeedbackPage from '../pages/feedbackPage';
import Detail from '../components/variants/DetailInformationVaccine';
import DoctorPage from '../pages/doctorPage';
import { FeedbackProvider } from '../components/Context/FeedbackContext';
import PaymentStatusPage from '../pages/paymentStatusPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage />} />

      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/aboutPage" element={<AboutPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/dashboardPage/:section" element={<DashboardPage />} />
      {/* Secret Routes */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/detailInformationVaccine/:type/:idVaccine" element={<Detail />} />
      <Route path="/pageProfile/:section/:id" element={<PageProfile />} />
      <Route path="/feedbackPage" element={<FeedbackProvider> <FeedbackPage /> </FeedbackProvider>} />
      {/* VaccineProvider applied only for specific pages */}
      <Route path="/paymentPage/:id" element={<PaymentPage />} />
      {/* </Route> */}

      {/* Non-Protected Route */}
      <Route path="/variantsPage" element={ <VariantsPage />} />
      <Route path="/doctorPage" element={<DoctorPage />} />
      <Route path="/payment/:status" element={<PaymentStatusPage />} />
    </Routes>
  );
}

export default App;
