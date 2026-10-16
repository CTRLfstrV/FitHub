import { Outlet } from "react-router-dom";
import UsersHeader from "../components/usersHeader";
import Footer from "../components/footer";
import RecepcionistaSideBar from "../components/recepcionistaSideBar";
import { RecepcionistaMenuProvider } from "../contexts/RecepcionistaMenuContext";

function RecepcionistaLayout() {
  return (
    <RecepcionistaMenuProvider>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
        <UsersHeader />
        <div className="flex flex-1 flex-col md:flex-row">
          <RecepcionistaSideBar />
          <main className="flex min-w-0 flex-1 flex-col bg-[#fbfcfa]">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </RecepcionistaMenuProvider>
  );
}

export default RecepcionistaLayout;
