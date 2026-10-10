import HomeLayout from "./layouts/homeLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
import HomePage from "./pages/homePage.tsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


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
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
