import { useRecepcionistaMenu } from "../contexts/RecepcionistaMenuContext";
import { Link } from "react-router-dom";

function RecepcionistaSideBar() {
  const { isOpen } = useRecepcionistaMenu();

  return (
    <aside className="absolute left-0 top-[82px] z-20 w-[min(85vw,320px)] font-mono shadow-lg md:static md:min-h-[calc(100dvh-82px)] md:w-[278px] md:shrink-0 md:bg-[#e8f5d9] md:shadow-none">
      <div
        id="recepcionista-sidebar-menu"
        className={`${isOpen ? "flex" : "hidden"} flex-col justify-between gap-2 border-b border-[#c8e6a8] bg-[#e8f5d9] px-3 py-2 text-[#20251e] md:flex md:min-h-[calc(100dvh-82px)] md:gap-5 md:border-b-0 md:border-r md:px-5 md:py-6`}
      >
        <div className="min-w-0">
          <h2 className="mb-3 hidden text-center text-2xl font-bold tracking-wide text-green-800 md:mb-5 md:block md:text-left md:text-3xl">
            Menu
          </h2>

          <nav
            aria-label="Menu da recepcionista"
            className="flex w-full min-w-0 flex-col items-stretch justify-start gap-1 overflow-visible md:gap-2"
          >
            <Link to="/recepcionista/dashboard" className="shrink-0 cursor-pointer rounded-lg px-2 py-2 text-left text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-lg">
              Início
            </Link>
            <Link to="/recepcionista/gerenciamento-alunos" className="shrink-0 cursor-pointer rounded-lg px-2 py-2 text-left text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-lg">
              Gerenciar alunos
            </Link>
            <button className="shrink-0 cursor-pointer rounded-lg px-2 py-2 text-left text-base text-[#20251e]/85 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white sm:text-lg md:px-3 md:py-2 md:text-lg">
              Matricular alunos
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default RecepcionistaSideBar;
