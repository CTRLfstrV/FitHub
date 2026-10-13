import HomeLayout from "./layouts/homeLayout.tsx";
import RecepcionistaLayout from "./layouts/recepcionistaLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
import HomePage from "./pages/homePage.tsx";
import RecepcionistaDashBoardPage from "./pages/recepcionistaDashboardPage.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//http://localhost:4173/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route element={<RecepcionistaLayout />}>
          <Route
            path="/recepcionista/dashboard"
            element={<RecepcionistaDashBoardPage />}
          />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
