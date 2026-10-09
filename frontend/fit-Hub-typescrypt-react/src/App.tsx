import "./App.css";
import LoginLayout from "./layouts/loginLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
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
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
