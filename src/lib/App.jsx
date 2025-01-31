import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import PaymentPage from '../pages/paymentPage';
import Test from '../components/test';
import VariantsPage from '../pages/variantsPage';
import AboutPage from '../pages/aboutPage';
import PageProfile from '../pages/PageProfile';
import DashboardPage from '../pages/dashboardPage';
import Detail from '../components/variants/DetailInformationVaccine';
import { VaccineProvider } from '../components/Context/ChildrenSelected';

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/pageProfile/:section" element={<PageProfile />} />
        <Route path="/dashboardPage" element={<DashboardPage />} />
        <Route path="/detailInformationVaccine/:type/:idVaccine" element={<Detail />} />

        {/* Bọc VaccineProvider chỉ cho 2 trang */}
        <Route
          path="/paymentPage"
          element={
            <VaccineProvider>
              <PaymentPage />
            </VaccineProvider>
          }
        />
        <Route
          path="/variantsPage"
          element={
            <VaccineProvider>
              <VariantsPage />
            </VaccineProvider>
          }
        />
      </Routes>

  );
}

export default App;
