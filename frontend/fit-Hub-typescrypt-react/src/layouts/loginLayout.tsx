import Header from "../components/loginHeader.tsx";
import { Outlet } from "react-router-dom";

function loginLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default loginLayout;
