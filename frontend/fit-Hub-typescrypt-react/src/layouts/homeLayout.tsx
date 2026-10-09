import { Outlet } from "react-router-dom";
import HomeHeader from "../components/homeHeader";
import Footer from "../components/footer";

function HomeLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      <HomeHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
