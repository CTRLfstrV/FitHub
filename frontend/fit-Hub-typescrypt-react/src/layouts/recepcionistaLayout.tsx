import { Outlet } from "react-router-dom";
import UsersHeader from "../components/usersHeader";
import Footer from "../components/footer";

function RecepcionistaLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <UsersHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RecepcionistaLayout;
