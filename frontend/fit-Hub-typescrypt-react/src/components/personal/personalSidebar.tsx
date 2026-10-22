import { Link } from "react-router-dom";
import { usePersonalMenu } from "../../contexts/PersonalMenuContext";

function PersonalSidebar() {
  const { isOpen } = usePersonalMenu();
  return (
    <aside className="absolute left-0 top-[82px] z-20 w-[min(85vw,320px)] font-mono shadow-lg md:static md:h-full md:min-h-0 md:w-[278px] md:shrink-0 md:bg-[#e8f5d9] md:shadow-none">
      <div id="personal-sidebar-menu" className={`${isOpen ? "flex" : "hidden"} flex-col gap-2 border-b border-[#c8e6a8] bg-[#e8f5d9] px-3 py-2 text-[#20251e] md:flex md:h-full md:gap-5 md:border-b-0 md:border-r md:px-5 md:py-6`}>
        <h2 className="mb-3 hidden text-2xl font-bold tracking-wide text-green-800 md:mb-5 md:block md:text-3xl">Menu</h2>
        <nav aria-label="Menu do personal" className="flex w-full flex-col gap-1 md:gap-2">
          <Link to="/personal/dashboard" className="rounded-lg px-3 py-2 text-left text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white md:text-lg">Início</Link>
        </nav>
      </div>
    </aside>
  );
}

export default PersonalSidebar;
